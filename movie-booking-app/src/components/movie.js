import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { APIS } from "../service/apis";

const Container = styled.div`
    gap: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 40px 120px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const MainScreenMovie = styled.div`
    width: 100%;
    height: 500px;
    background-color: #eee;
`;

const MainScreenImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const SubScreenWrapper = styled.div`
    gap: 40px;
    width: 100%;
    height: 350px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: space-between;
`;

const SubScreenMovie = styled(MainScreenMovie)`
    height: 100%;
    width: 600px;
    flex: 0 0 auto;
`;

export const MoviePage = function (props) {
    const { state: UserState } = useLocation();
    const nav = useNavigate();
    const [movies, setMovies] = React.useState([]);
    React.useEffect(function () {
        const getAllMovies = async function () {
            const { data } = await APIS("/getAllMovies");
            setMovies(data.data);
        };
        getAllMovies();
    }, []);
    const [mainScreen, ...restMovies] = movies;
    const onMovieSelect = function (evt) {
        const id = evt.currentTarget.id;
        const title = evt.currentTarget.title;
        const screenId = evt.currentTarget.getAttribute("screens");
        const stateObj = {
            state: {
                screenId,
                movieId: id,
                movieTitle: title,
                isAdmin: props.isAdmin,
                ...UserState,
            },
        };
        debugger;
        nav(props.isAdmin ? "/admin-screen" : "/user-screen", stateObj);
    };
    return (
        <Container>
            <MainScreenMovie>
                <MainScreenImg
                    id={mainScreen?.id}
                    onClick={onMovieSelect}
                    src={mainScreen?.image}
                    title={mainScreen?.name}
                    screens={mainScreen?.screens}
                />
            </MainScreenMovie>
            <SubScreenWrapper>
                {restMovies.map((movie) => {
                    return (
                        <SubScreenMovie>
                            <MainScreenImg
                                id={movie.id}
                                src={movie.image}
                                title={movie.name}
                                onClick={onMovieSelect}
                                screens={movie.screens}
                            />
                        </SubScreenMovie>
                    );
                })}
            </SubScreenWrapper>
        </Container>
    );
};
