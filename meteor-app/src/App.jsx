import { useState, useEffect } from 'react';
import './App.css';
import MyNav from './components/MyNav';
import DaysContainer from './components/DaysContainer';

function App() {
  const [positions, setPositions] = useState([0, 0]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dati, setDati] = useState({});
  const [dates5, setDates5] = useState({});

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

      fetchCoords();
      fetch5Data();
    }
  }, [positions]);

  return (
    <>
      <MyNav city={city} country={country} setPositions={setPositions} setCity={setCity} setCountry={setCountry} />
      <DaysContainer today={dati} dates5={dates5}/>
    </>
  );
}

export default App;

