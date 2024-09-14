import { useState, useEffect } from 'react'
import './App.css'
import MyNav from './components/MyNav'

function App() {

  const [positions, setPositions] = useState([0, 0])
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (positions[0] != position.coords.latitude)
          setPositions([position.coords.latitude, position.coords.longitude])
      }
      , (error) => {
        console.error("Errore nella richiesta di geolocalizzazione" + error)
      }
    )
  } else {
    console.error("Localizzazione non supportata dal browser")
  }

  const myFetchCoords = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${positions[0]}&lon=${positions[1]}&appid=e817edfdb93608a78cc8f70f2ec220d7&lang=it&units=metric`
    )

      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La chiamata non è andata a buon fine");
        }
      })

      .then((data) => {
        setCity(data.name)
        setCountry(data.sys.country)
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    myFetchCoords()
  }, [city])


  return (
    <>
      <MyNav city={city} country={country} setPositions={setPositions} setCity={setCity} setCountry={setCountry} />
    </>
  )
}

export default App
