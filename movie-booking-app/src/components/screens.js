import { Button } from "@peppyui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { APIS } from "../service/apis";

const Container = styled.div`
    gap: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 100px 200px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const Screen = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0 24px;
    border-radius: 12px;
    align-items: center;
    margin-bottom: 40px;
    background-color: #eeeeee33;
    justify-content: space-between;
`;

const SeatContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
`;

const Seat = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    font-size: 18px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    color: ${(props) =>
        props.selected
            ? "#ff9800"
            : props.disabled
            ? props.isAdmin
                ? "#ff9800"
                : "#eeeeee88"
            : "#eee"};
    box-shadow: ${(props) =>
        props.selected
            ? "0 0 0 1px #ff9800"
            : props.disabled
            ? props.isAdmin
                ? "0 0 0 1px #ff9800"
                : "none"
            : "0 0 0 1px #eeeeee55"};
    background-color: ${(props) =>
        props.selected
            ? "ff980033"
            : props.disabled
            ? props.isAdmin
                ? "#ff980033"
                : "#fafafa11"
            : "#eeeeee33"};
    cursor: ${(props) => (props.disabled ? "not-allowed " : "pointer")};

    &:hover {
        color: ${(props) => (props.disabled ? "#eeeeee88" : "#ff9800")};
        box-shadow: ${(props) =>
            props.disabled ? "none" : "0 0 0 1px #ff9800"};
    }
`;

const Tooltip = styled.div.attrs({
    id: "tooltip",
})`
    color: #eee;
    width: 210px;
    height: 65px;
    position: absolute;
    background-color: #1d1724;
    box-shadow: 0 0 0 1px #ff9800;
    visibility: hidden;

    display: flex;
    align-items: center;
    padding: 4px 0px 4px 22px;
    border-radius: 40px;
`;

const SeatNumber = styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-right: 6px;
`;

const TotalBookings = styled.span`
    color: #aaa;
    font-size: 24px;
    font-weight: bold;
`;

const RemainingSeats = styled(TotalBookings)``;
const mapSeatPrices = {
    A: "₹200",
    B: "₹200",
    C: "₹250",
    D: "₹250",
    E: "₹250",
    F: "₹350",
    G: "₹350",
};
export const Screens = function (props) {
    const tooltipRef = React.useRef();
    const { state: userState } = useLocation();
    const [seats, dispatchSeats] = React.useState([]);
    const [selectedSeat, setSelectedSeat] = React.useState(null);
    React.useEffect(function () {
        const getScreens = async function () {
            const { data } = await APIS(
                `/getAllScreens?screenId=${userState.screenId}`
            );

            if (data.data) {
                dispatchSeats(data.data.seatsAvailability);
            }
        };
        getScreens();
    }, []);
    // seatMarkings = [A, B, C, D]
    // allSeats = [[1,2,3,4..], [1,2,3,4...]]
    const [seatMarkings, ...allSeats] = seats;

    let totalSeats = 0;
    let totalSeatsBooked = 0;
    if (seats.length !== 0) {
        for (let i = 0; i < seatMarkings.length; i++) {
            for (let j = 0; j < allSeats[i].length; j++) {
                debugger;

                if (typeof allSeats[i][j] === "number") {
                    totalSeats += 1;
                } else {
                    totalSeatsBooked += 1;
                }
            }
        }
    }

    const onSeatBooking = async function (evt) {
        const { data } = await APIS("/bookSeat", "post", {
            ...userState,
            selectedSeat,
        });

        if (data.data) {
            dispatchSeats(data.data.seatsAvailability);
        }
    };

    const showTooltip = function (evt) {
        tooltipRef.current.style.left = evt.clientX + "px";
        tooltipRef.current.style.top = evt.clientY + "px";
        tooltipRef.current.style.visibility = "visible";
        setSelectedSeat(evt.currentTarget.id);
    };

    const hideTooltip = function () {
        tooltipRef.current.style.visibility = "hidden";
    };

    const generateSeats = function () {
        let returnVal = [];
        let WrapperComponent = [];
        if (seats.length === 0) return seats;

        for (let i = 0; i < seatMarkings.length; i++) {
            for (let j = 0; j < allSeats[i].length; j++) {
                returnVal.push(
                    <Seat
                        onClick={showTooltip}
                        isAdmin={userState.isAdmin || false}
                        disabled={allSeats[i][j].length > 3}
                        id={`${seatMarkings[i]}-${allSeats[i][j]}`}
                        selected={
                            typeof allSeats[i][j] === "string"
                                ? allSeats[i][j] === userState.userName
                                : false
                        }
                    >
                        {`${seatMarkings[i]} ${
                            allSeats[i][j].length > 3 ? j + 1 : allSeats[i][j]
                        }`}
                    </Seat>
                );
            }
            WrapperComponent.push(
                <SeatContainer>{[...returnVal]}</SeatContainer>
            );
            returnVal = [];
        }

        return WrapperComponent;
    };

    return (
        <Container onMouseUp={hideTooltip}>
            <Screen>
                {userState.isAdmin && (
                    <>
                        <TotalBookings>
                            {totalSeatsBooked} Seats Booked
                        </TotalBookings>
                        <RemainingSeats>
                            {totalSeats - totalSeatsBooked} Seats Remaining
                        </RemainingSeats>
                    </>
                )}
            </Screen>
            {generateSeats()}
            <Tooltip ref={tooltipRef}>
                {selectedSeat && (
                    <SeatNumber>
                        {selectedSeat.replace("-", "")}:
                        {mapSeatPrices[selectedSeat.split("-")[0]]}
                    </SeatNumber>
                )}
                <Button roundCorner size="xxl" onClick={onSeatBooking}>
                    Book
                </Button>
            </Tooltip>
        </Container>
    );
};
