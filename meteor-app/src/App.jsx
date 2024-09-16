import { useState, useEffect } from 'react';
import './App.css';
import MyNav from './components/MyNav';
import DaysContainer from './components/DaysContainer';
import GM from "./components/GM";
import { Container, Row, Col } from 'react-bootstrap';
import ChartContainer from './components/ChartContainer';
import OtherBigCities from './components/OtherBigCities';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFoundPage from './components/NotFoundPage';

function App() {
  const defaultPosition = [40.8518, 14.2681];
  const [positions, setPositions] = useState(defaultPosition);
  const [city, setCity] = useState("Napoli");
  const [country, setCountry] = useState("IT");
  const [dati, setDati] = useState({});
  const [dates5, setDates5] = useState({});

  //fetch 3
  const fetch5Data = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${positions[0]}&lon=${positions[1]}&appid=e1f339447dd50fa48017f5ae33f3eb56&lang=it&units=metric`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La chiamata non è andata a buon fine");
        }
      })
      .then((data) => {
        setDates5(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch 4
  const fetchCoords = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${positions[0]}&lon=${positions[1]}&appid=e1f339447dd50fa48017f5ae33f3eb56&lang=it&units=metric`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La chiamata non è andata a buon fine");
        }
      })
      .then((data) => {
        setCity(data.name);
        setCountry(data.sys.country);
        setDati(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPositions([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Errore nella richiesta di geolocalizzazione", error);
        }
      );
    } else {
      console.error("Localizzazione non supportata dal browser");
    }
  }, []);

  useEffect(() => {
    if (positions[0] && positions[1]) {
      fetchCoords();
      fetch5Data();
    }
  }, [positions]);

  return (
    <>
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<>
            <MyNav city={city} country={country} setPositions={setPositions} setCity={setCity} setCountry={setCountry} />
            <Container>
              <Row>
                <Col lg={8}>
                  {dati && dates5.list && <DaysContainer today={dati} dates5={dates5} />}
                </Col>
                <Col xs={12} lg={4}>
                  <ChartContainer dati={dates5} />
                </Col>
                <Col xs={12} lg={9}>
                  <GM coord={positions} setPosition={setPositions} />
                </Col>
                <Col xs={12} lg={3}>
                  <OtherBigCities setPos={setPositions} />
                </Col>
              </Row>
            </Container>
          </>
          }>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
