/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RainChart from "./RainChart";


function ChartContainer({ dati }) {

    const [data, setData] = useState(null)

    const handleData = () => {
        if (dati.list) {
            setData([
                { name: dati.list[0].dt_txt.split(" ")[1].split(":")[0], value: dati.list[0].pop * 100 },
                { name: dati.list[1].dt_txt.split(" ")[1].split(":")[0], value: dati.list[1].pop * 100 },
                { name: dati.list[2].dt_txt.split(" ")[1].split(":")[0], value: dati.list[2].pop * 100 },
                { name: dati.list[3].dt_txt.split(" ")[1].split(":")[0], value: dati.list[3].pop * 100 },
                { name: dati.list[4].dt_txt.split(" ")[1].split(":")[0], value: dati.list[4].pop * 100 },
                { name: dati.list[5].dt_txt.split(" ")[1].split(":")[0], value: dati.list[5].pop * 100 },
                { name: dati.list[6].dt_txt.split(" ")[1].split(":")[0], value: dati.list[6].pop * 100 },
                { name: dati.list[7].dt_txt.split(" ")[1].split(":")[0], value: dati.list[7].pop * 100 },
            ]);
        }
    }

    useEffect(() => {
        handleData()
    }, [dati])

    return (
        <div className="mt-5">
            <h5 className="text-light">Probabilità di pioggia</h5>
            {
                dati.list && <RainChart data={data} />
            }

        </div>
    );
}

export default ChartContainer;
