import React from "react";
import axios from "axios";

export const useGridData = function ({
    url,
    method = "get",
    data = {},
    hasId = false,
}) {
    const [respData, setRespData] = React.useState([]);

    React.useEffect(() => {
        const getData = async function () {
            let resp = await axios({ method, url, data });
            // adding id to every row data for mui grid
            hasId && resp.data.forEach((item, index) => (item.id = index));

            setRespData(resp.data);
        };

        getData();
    }, []);

    return respData;
};
