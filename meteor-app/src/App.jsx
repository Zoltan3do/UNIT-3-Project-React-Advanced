import { useState, useEffect } from 'react';
import './App.css';
import MyNav from './components/MyNav';
import DaysContainer from './components/DaysContainer';
import GlobalMap from "./components/GlobalMap";
import { Container, Row, Col } from 'react-bootstrap';
import ChartContainer from './components/ChartContainer';
import OtherBigCities from './components/OtherBigCities';

function App() {
  const [positions, setPositions] = useState([0, 0]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
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
        console.log(data)
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
      <MyNav city={city} country={country} setPositions={setPositions} setCity={setCity} setCountry={setCountry} />

      <Container>
        <Row>
          <Col lg={8}>
            {
              dati && dates5.list &&
              <DaysContainer today={dati} dates5={dates5} />
            }
          </Col>
          <Col lg={4}><ChartContainer dati={dates5}></ChartContainer></Col>
          <Col lg={9}>
            <GlobalMap coord={positions} setPosition={setPositions}></GlobalMap>
          </Col>
          <Col lg={3}>
            <OtherBigCities setPos={setPositions}></OtherBigCities>
          </Col>
        </Row>

      </Container>

    </>
  );
}

export default App;

