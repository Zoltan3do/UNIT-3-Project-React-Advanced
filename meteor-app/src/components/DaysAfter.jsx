/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import variables from "..//variables.json";
import { useEffect, useState } from "react";
import { convertTimestampToFormattedDate, getDayInItalian } from '../utils.js';

function DaysAfter({ dt, datas }) {
    const [iconClass, setIconClass] = useState("");

    const handleVariables = () => {
        const description = datas.weather[0]?.description || "";
        switch (description) {
            case "nubi sparse":
                setIconClass(variables["nubi-sparse"].clas);
                break;
            case "cielo sereno":
                setIconClass(variables["cielo-sereno"].clas);
                break;
            case "cielo coperto":
                setIconClass(variables["cielo-coperto"].clas);
                break;
            case "pioggia leggera":
                setIconClass(variables["pioggia-leggera"].clas);
                break;
            case "pioggia moderata":
                setIconClass(variables["pioggia-moderata"].clas);
                break;
            case "poche nuvole":
                setIconClass(variables["poche-nuvole"].clas);
                break;
            case "forte pioggia":
                setIconClass(variables["forte-pioggia"].clas);
                break;
            default:
                setIconClass(""); // Imposta un valore di default se nessuna condizione corrisponde
                break;
        }
    };

    useEffect(() => {
        handleVariables();
    }, [datas]); // Aggiungi `datas` come dipendenza

    const oggi = getDayInItalian(convertTimestampToFormattedDate(dt));

    return (
        <Card style={{ backgroundColor: "#1B1B1D" }} className="rounded rounded-5 p-2 h-100 mt-5 mt-md-0">
            <Card.Header className="d-flex justify-content-between align-items-center border-secondary">
                <h3 className="text-light">{oggi.substring(0, 3)}</h3>
            </Card.Header>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between" style={{ fontSize: "3.5em" }}>
                    <i className={`bi ${iconClass} text-light`}></i>
                </Card.Title>
                <Card.Text className="text-light fs-2 mt-5 fw-semibold">
                    {parseInt(datas.main.temp).toFixed(0)}°
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default DaysAfter;
