/* eslint-disable react/prop-types */
import { Nav, Form, Container, Navbar } from "react-bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";

function MyNav({ city, country, setPositions, setCity, setCountry }) {

    const [inputValue, setInputValue] = useState("");
    const [val, setVal] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setVal(inputValue)
        fetchInput(val)
        e.target.reset()
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const fetchInput = (searchQuery) => {
        if (searchQuery) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=9a57447c456d4d1bfaf1ad4ac7e25dea&lang=it&units=metric`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("La chiamata non è andata a buon fine");
                    }
                })
                .then((data) => {
                    setPositions([data.coord.lat, data.coord.lon])
                    setCountry(data.sys.country)
                    setCity(data.name)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        fetchInput(val)
    }, [val])



    return (
        <Navbar className="d-flex justify-content-between bg-body-dark">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="basic-navbar-nav" className="w-100">
                    <Nav className="d-flex justify-content-between w-100 align-items-center">
                        <Nav.Link href="#home" className="d-none d-md-flex align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <div className="circle-container">
                                    <i className="bi bi-grid-fill text-light"></i>
                                </div>
                                <div className="circle-container me-3">
                                    <i className="bi bi-bell-fill text-light"></i>
                                </div>
                            </div>
                        </Nav.Link>
                        <p className="text-light mb-0 fs-6 city-country-container">
                            <i className="bi bi-geo-alt-fill text-light fs-5"></i>&nbsp;
                            {city}, {country}
                        </p>

                        <Form className="flex-grow-1 mx-3" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Cerca città..." className="search-input py-3 w-100" id="search" onChange={handleInputChange} />
                        </Form>

                        <Nav.Link>
                            <div className="circle-container overflow-hidden">
                                <img src="https://i.pinimg.com/236x/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg" alt="immagine profilo" className="w-100" />
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    )
}

export default MyNav