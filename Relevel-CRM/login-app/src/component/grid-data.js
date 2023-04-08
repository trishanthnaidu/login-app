import React from "react";

export const useGridData = function ({ url, hasId = false }) {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const getData = async function () {
            const resp = await fetch(url);
            let data = await resp.json();

            // adding id to every row data for mui grid
            hasId && data.forEach((item, index) => (item.id = index));

            setData(data);
        };

        getData();
    }, []);

    return data;
};
