/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import variables from "..//variables.json";
import { convertTimestampToFormattedDate, getDayInItalian } from '../utils';

function Today({ dt, datas }) {
    const [timeNow, setTimeNow] = useState("");
    const [iconClass, setIconClass] = useState("");
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");

    const handleVariables = () => {
        const description = datas.weather[0]?.description || "";
        switch (description) {
            case "nubi sparse":
                setIconClass(variables["nubi-sparse"].clas);
                setColor1(variables["nubi-sparse"].colors[0]);
                setColor2(variables["nubi-sparse"].colors[1]);
                break;
            case "cielo sereno":
                if (parseInt(timeNow.split(":")[0]) < 18 && parseInt(timeNow.split(":")[0]) > 6)
                    setIconClass(variables["cielo-sereno"].clas);
                else
                    setIconClass("bi-moon-stars-fill");
                setColor1(variables["cielo-sereno"].colors[0]);
                setColor2(variables["cielo-sereno"].colors[1]);
                break;
            case "cielo coperto":
                setIconClass(variables["cielo-coperto"].clas);
                setColor1(variables["cielo-coperto"].colors[0]);
                setColor2(variables["cielo-coperto"].colors[1]);
                break;
            case "pioggia leggera":
                setIconClass(variables["pioggia-leggera"].clas);
                setColor1(variables["pioggia-leggera"].colors[0]);
                setColor2(variables["pioggia-leggera"].colors[1]);
                break;
            case "pioggia moderata":
                setIconClass(variables["pioggia-moderata"].clas);
                setColor1(variables["pioggia-moderata"].colors[0]);
                setColor2(variables["pioggia-moderata"].colors[1]);
                break;
            case "poche nuvole":
                setIconClass(variables["poche-nuvole"].clas);
                setColor1(variables["poche-nuvole"].colors[0]);
                setColor2(variables["poche-nuvole"].colors[1]);
                break;
            case "forte pioggia":
                setIconClass(variables["forte-pioggia"].clas);
                setColor1(variables["forte-pioggia"].colors[0]);
                setColor2(variables["forte-pioggia"].colors[1]);
                break;
            default:
                setIconClass(variables["cielo-sereno"].clas);
                setColor1("#1B1B1D");
                setColor2("#1B1B1D");
                break;
        }
    };

    useEffect(() => {
        handleVariables();
    }, [datas]);

    useEffect(() => {
        let isMounted = true;
        const updateTime = () => {
            if (isMounted) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, "0");
                const minutes = String(now.getMinutes()).padStart(2, '0');
                setTimeNow(`${hours}:${minutes}`);
            }
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    const oggi = getDayInItalian(convertTimestampToFormattedDate(dt));

    return (
        <Card style={{ backgroundColor: color2 }} className="rounded rounded-5 p-2">
            <Card.Header className="d-flex justify-content-between align-items-center rounded rounded-5" style={{ backgroundColor: color1 }}>
                <h6 className="mb-0">{oggi}</h6>
                <p className="mb-0 fw-bold">{timeNow}</p>
            </Card.Header>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between" style={{ fontSize: "3.5em" }}>
                    <p className="fw-bold">{datas?.main?.temp ? parseInt(datas.main.temp).toFixed(0) : 'N/A'}°</p>
                    <span><i className={`bi ${iconClass}`}></i></span>
                </Card.Title>
                <div>
                    <ul className="list-group text-start">
                        <li className="list-group-item distanzaListItem text-truncate" style={{ backgroundColor: color2 }}>Gradi percepiti: <small className="fw-semibold text-dark">{datas?.main?.feels_like ? datas.main.feels_like : 'N/A'}°</small></li>
                        <li className="list-group-item distanzaListItem text-truncate" style={{ backgroundColor: color2 }}>Vento: N-E, <small className="fw-semibold text-dark">{datas?.wind?.speed ? datas.wind.speed : 'N/A'} Km/h</small></li>
                        <li className="list-group-item distanzaListItem" style={{ backgroundColor: color2 }}>Pressione: <small className="fw-semibold text-dark">{datas?.main?.pressure ? datas.main.pressure : 'N/A'}MB</small></li>
                        <li className="list-group-item distanzaListItem" style={{ backgroundColor: color2 }}>Umidità: <small className="fw-semibold text-dark">{datas?.main?.humidity ? datas.main.humidity : 'N/A'}%</small></li>
                    </ul>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Today;
