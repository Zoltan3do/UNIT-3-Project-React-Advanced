import { useState, useEffect } from 'react';
import './App.css';
import MyNav from './components/MyNav';
import DaysContainer from './components/DaysContainer';
import GlobalMap from "./components/GlobalMap";
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [positions, setPositions] = useState([0, 0]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dati, setDati] = useState({});
  const [dates5, setDates5] = useState({});


  const fetch5Data = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${positions[0]}&lon=${positions[1]}&appid=e817edfdb93608a78cc8f70f2ec220d7&lang=it&units=metric`)
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

  const fetchCoords = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${positions[0]}&lon=${positions[1]}&appid=e817edfdb93608a78cc8f70f2ec220d7&lang=it&units=metric`)
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
          <Col lg={9}>
            <DaysContainer today={dati} dates5={dates5} />
          </Col>
          <Col lg={9}>
            <GlobalMap coord={positions} setPosition={setPositions}></GlobalMap>
          </Col>
        </Row>

      </Container>

    </>
  );
}

export default App;

