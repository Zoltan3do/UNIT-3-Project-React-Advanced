/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RainChart from "./RainChart";


function ChartContainer({ dati }) {

    const [data, setData] = useState(null)

    const handleData = () => {
        if (dati.list) {
            setData([
                { name: 'Piovoso', value: dati.list[0].wind.speed * 10 },
                { name: 'Soleggiato', value: dati.list[4].wind.speed * 10 },
                { name: 'Estremo', value: dati.list[7].wind.speed * 10 },
            ]);
        }
    }

    useEffect(() => {
        handleData()
        console.log(data)
    }, [dati])

    return (
        <div className="mt-5">
            <h4 className="text-light">Possibilità di pioggia</h4>
            {
                dati.list && <RainChart data={data} />
            }

        </div>
    );
}

export default ChartContainer;
