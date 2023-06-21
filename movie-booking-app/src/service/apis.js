import axios from "axios";
import PropTypes from "prop-types";

const defaultConfig = {
    data: {},
    method: "get",
    endpoint: "/",
    headers: {
        "Content-Type": "application/json",
    },
};
const baseURL = "http://localhost:9000";

export const APIS = function (endpoint, method, data) {
    return axios({
        ...defaultConfig,
        data,
        method,
        url: `${baseURL}${endpoint}`,
    });
};

APIS.propTypes = {
    url: PropTypes.string,
    data: PropTypes.object,
    method: PropTypes.oneOf(["get", "post"]),
};
