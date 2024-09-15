import { Container, Row, Col } from "react-bootstrap"
import BigCity from "./BigCity"
import { useState } from "react"
import variables from "..//variables.json";

function OtherBigCities() {


    const [datiCitta, setDatiCitta] = useState(null)
    const [iconClass, setIconClass] = useState(null)

    const handleVariables = () => {
        const description = datiCitta.weather[0]?.description || "";
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
                setIconClass("");
                break;
        }
    };

    const grandiCitta = [
        "Roma",
        "Tokyo",
        "Delhi",
        "Shangai",
        "Sao Paulo",
        "Cairo",
        "Beijing",
        "Dhaka",
        "Osaka"
    ]

    const fetchInput = (searchQuery) => {
        if (searchQuery) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=e817edfdb93608a78cc8f70f2ec220d7&lang=it&units=metric`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("La chiamata non è andata a buon fine");
                    }
                })
                .then((data) => {
                    setDatiCitta(data);
                    handleVariables()
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <Container>
            <Row>
                {
                    datiCitta && iconClass &&
                    grandiCitta.map((bc) => {
                        fetchInput(bc);
                        <Col lg={12}>
                            <BigCity stato={datiCitta.sys.country}
                                citta={datiCitta.name}
                                descrizione={datiCitta.weather[0].description}
                                gradi={parseFloat(datiCitta.main.temp).toFixed(0)}
                                icona={iconClass}
                            ></BigCity>
                        </Col>
                    })
                }
            </Row>
        </Container>
    )
}
export default OtherBigCities