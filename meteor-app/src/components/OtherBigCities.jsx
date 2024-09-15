/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";
import BigCity from "./BigCity";
import { useState, useEffect } from "react";
import variables from "..//variables.json";

function OtherBigCities({ setPos }) {
    const [datiCitta, setDatiCitta] = useState([]);
    // const [iconClasses, setIconClasses] = useState({});

    const grandiCitta = [
        "Roma",
        "Tokyo",
        "Delhi",
        "Shangai",
        "Sao Paulo",
        "Cairo",
        "Beijing",
        "Dhaka",
        "Osaka",
    ];

    const fetchInput = async (searchQuery) => {
        if (searchQuery) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=e1f339447dd50fa48017f5ae33f3eb56&lang=it&units=metric`
                );
                if (!response.ok) throw new Error("La chiamata non è andata a buon fine");
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
        return null;
    };

    const handleVariables = (description) => {
        switch (description) {
            case "nubi sparse":
                return variables["nubi-sparse"].clas;
            case "cielo sereno":
                return variables["cielo-sereno"].clas;
            case "cielo coperto":
                return variables["cielo-coperto"].clas;
            case "pioggia leggera":
                return variables["pioggia-leggera"].clas;
            case "pioggia moderata":
                return variables["pioggia-moderata"].clas;
            case "poche nuvole":
                return variables["poche-nuvole"].clas;
            case "forte pioggia":
                return variables["forte-pioggia"].clas;
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchAllCities = async () => {
            const cityDataPromises = grandiCitta.map(async (city) => {
                const data = await fetchInput(city);
                if (data) {
                    const iconClass = handleVariables(data.weather[0].description);
                    return {
                        ...data,
                        iconClass,
                    };
                }
                return null;
            });

            const citiesData = await Promise.all(cityDataPromises);
            setDatiCitta(citiesData.filter(Boolean));
        };

        fetchAllCities();
    }, []);

    return (
        <>
            <h5 className="text-light mb-4 mt-5">Altre grandi città</h5>
            <Container className="scrollable-container">
                <Row>
                    {datiCitta.map((cityData) => (
                        <Col lg={12} key={cityData.id}>
                            <BigCity
                                stato={cityData.sys.country}
                                citta={cityData.name}
                                descrizione={cityData.weather[0].description}
                                gradi={parseFloat(cityData.main.temp).toFixed(0)}
                                icona={cityData.iconClass}
                                lat={cityData.coord.lat}
                                lon={cityData.coord.lon}
                                setPos={setPos}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>

    );
}

export default OtherBigCities;
