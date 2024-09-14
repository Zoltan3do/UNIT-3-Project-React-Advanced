/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import variables from "../../public/variables.json";
import { useEffect, useState } from "react";

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

    function convertTimestampToFormattedDate(dt) {
        const date = new Date(dt * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getDayInItalian(ciao) {
        const giorniSettimana = [
            'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
        ];
        const date = new Date(ciao);
        const dayOfWeek = date.getDay();
        return giorniSettimana[dayOfWeek];
    }

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
