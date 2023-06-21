const express = require("express");
const cors = require("cors");
const app = express();
const port = 9000;

app.use(express.json(), express.urlencoded(), cors());

app.post("/authenticate", (req, res) => {
    res.send({ ...authenticateUser(req, res) });
});

app.get("/getAllMovies", (req, res) => {
    respObj.data = getMovies();
    respObj.success.successCode = 200;
    respObj.success.successMessage = "All Movies returned";

    res.send({ ...respObj });
});

app.get("/getAllScreens", (req, res) => {
    const screenId = req.query?.screenId;
    respObj.data = getScreens().find((items) => items.id === screenId);
    respObj.success.successCode = 200;
    respObj.success.successMessage = "All Screens returned";

    res.send({ ...respObj });
});

app.post("/bookSeat", (req, res) => {
    let newBookingId = "4001";
    const { isAdmin, movieId, movieTitle, screenId, userName, selectedSeat } =
        req.body;
    const userId =
        getConsumers().find((user) => user.userName === userName).id || null;
    const bookings = getBookings();

    if (bookings.length > 0) {
        newBookingId = Number(bookings[bookings.length - 1].id) + 1;
    }
    // create a booking
    if (userId) {
        const newBooking = {
            movieId,
            userName,
            screenId,
            consumerId: userId,
            dt: new Date().getTime(),
            seatNumber: selectedSeat,
            id: newBookingId.toString(),
        };
        setBooking(newBooking);
        // reserve the seat
        updateScreenSeat(newBooking);
    }

    // PAYMENT GATEWAY = sync
    respObj.data = getScreens().find((items) => items.id === screenId);
    respObj.success.successCode = 200;
    respObj.success.successMessage = "All Screens returned";

    res.send({ ...respObj });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// enums
const userTypes = {
    ADMIN: 0,
    USER: 1,
    BLOCKED_USER: 2,
};

const respObj = {
    data: null,
    error: {
        errorCode: null,
        errorMessage: "",
    },
    success: {
        successCode: null,
        successMessage: "",
    },
};

// bd
const dbDocs = {
    // tables
    consumers: [
        {
            id: "1001",
            userName: "@trnaidu",
            password: "1234",
            phoneNumber: "+91 987654321",
            type: userTypes.ADMIN,
        },
        {
            id: "1002",
            userName: "@vmokashi",
            password: "1234",
            phoneNumber: "+91 987654321",
            type: userTypes.USER,
        },
        {
            id: "1003",
            userName: "@jbhatt",
            password: "1234",
            phoneNumber: "+91 987654321",
            type: userTypes.USER,
        },
        {
            id: "1004",
            userName: "@ppal1003",
            password: "1234",
            phoneNumber: "+91 987654321",
            type: userTypes.USER,
        },
        {
            id: "1005",
            userName: "@spalai",
            password: "1234",
            phoneNumber: "+91 987654321",
            type: userTypes.USER,
        },
    ],
    bookings: [],
    screens: [
        // placeholder schema
        {
            id: "3001",
            capacity: "49",
            movieId: "2001",
            seatsAvailability: [
                ["A", "B", "C", "D", "E", "F", "G"],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ],
        },
        {
            id: "3002",
            capacity: "49",
            movieId: "2002",
            seatsAvailability: [
                ["A", "B", "C", "D", "E", "F", "G"],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ],
        },
        {
            id: "3003",
            capacity: "49",
            movieId: "2003",
            seatsAvailability: [
                ["A", "B", "C", "D", "E", "F", "G"],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ],
        },
        {
            id: "3004",
            capacity: "49",
            movieId: "2004",
            seatsAvailability: [
                ["A", "B", "C", "D", "E", "F", "G"],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ],
        },
        {
            id: "3005",
            capacity: "49",
            movieId: "2005",
            seatsAvailability: [
                ["A", "B", "C", "D", "E", "F", "G"],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ],
        },
        {
            id: "3006",
            capacity: "49",
            movieId: "2006",
            seatsAvailability: [
                ["A", "B", "C", "D", "E", "F", "G"],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            ],
        },
    ],
    movies: [
        {
            id: "2001",
            name: "Chhichhore",
            cost: "₹250",
            lang: "Hindi",
            genre: "Comedy Drama",
            image: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/8929/1428929-i-0d0b15f61010",
            slots: "1",
            screens: "3001",
            category: "Drama",
            duration: "2:45hrs",
            intervalTime: "1:45hrs",
            intervalDuration: "15mins",
        },
        {
            id: "2002",
            name: "3 Idiots",
            cost: "₹230",
            lang: "Hindi",
            genre: "Comedy Drama",
            image: "https://images.cinemaexpress.com/uploads/user/imagelibrary/2020/5/1/original/3_Idiots.PNG?w=768&dpr=2.0",
            slots: "1",
            screens: "3002",
            category: "Drama",
            duration: "2:45hrs",
            intervalTime: "1:45hrs",
            intervalDuration: "15mins",
        },
        {
            id: "2003",
            name: "Titanic",
            cost: "₹200",
            lang: "English",
            genre: "Historical Romance",
            image: "https://images5.alphacoders.com/349/349578.jpg",
            slots: "1",
            screens: "3003",
            category: "Romance",
            duration: "3:15hrs",
            intervalTime: "2:30hrs",
            intervalDuration: "15mins",
        },
        {
            id: "2004",
            name: "Avengers End Game",
            cost: "₹300",
            lang: "English",
            genre: "Sci-Fi",
            image: "https://i.etsystatic.com/29534914/r/il/f2e468/3542031550/il_fullxfull.3542031550_957n.jpg",
            slots: "1",
            screens: "3004",
            category: "Sci-Fi",
            duration: "2:15hrs",
            intervalTime: "1:30hrs",
            intervalDuration: "15mins",
        },
        {
            id: "2005",
            name: "Adhipurush",
            cost: "₹400",
            lang: "Hindi",
            genre: "Historical Sci-Fi",
            image: "https://i.ytimg.com/vi/MDB_AKqawOY/maxresdefault.jpg",
            slots: "1",
            screens: "3005",
            category: "Historical",
            duration: "3:15hrs",
            intervalTime: "1:30hrs",
            intervalDuration: "15mins",
        },
        {
            id: "2006",
            name: "X Fast",
            cost: "₹400",
            lang: "English",
            genre: "Action",
            image: "https://i.ytimg.com/vi/uS05vR6Jdnk/maxresdefault.jpg",
            slots: "1",
            screens: "3006",
            category: "Action",
            duration: "2:15hrs",
            intervalTime: "1:30hrs",
            intervalDuration: "15mins",
        },
    ],
};

// getters
function getConsumers() {
    return dbDocs.consumers;
}
function getMovies() {
    return dbDocs.movies;
}
function getScreens() {
    return dbDocs.screens;
}
function getBookings() {
    return dbDocs.bookings;
}

// setters
function setBooking(newBooking) {
    dbDocs.bookings = [...dbDocs.bookings, newBooking];
}

// logical functions - Middleware
function authenticateUser(req, res) {
    let user = null;
    let resp = { ...respObj };

    const userName = req.body.userName || "";
    const password = req.body.password || "";

    const consumers = getConsumers();

    // check if the consumer exists
    user = consumers.find((user) => user.userName === userName);

    if (user && user.password === password) {
        resp.data = {
            isAuth: true,
            userName: user.userName,
            isAdmin: user.type === userTypes.ADMIN,
        };
        resp.success.successCode = 200;
        resp.success.successMessage = "Authenticated Successfully";
        return resp;
    }
    resp.data = {
        isAuth: false,
        isAdmin: false,
        userName: "",
    };
    resp.error.errorCode = 404;
    resp.error.errorMessage = "Not Authenticated";
    return resp;
}

function updateScreenSeat(booking) {
    const screens = getScreens();
    const currentScreen = screens.find((item) => item.id === booking.screenId);
    const seatsAvailability = currentScreen.seatsAvailability;
    const selectedSeat = booking.seatNumber.split("-");

    const seatRow = selectedSeat[0];
    const seatNumber = selectedSeat[1];

    let rowIndex = 0;
    seatsAvailability[0].forEach((row, index) => {
        if (row === seatRow) {
            rowIndex = index + 1;
        }
    });

    seatsAvailability[rowIndex][seatNumber - 1] = booking.userName;
}
