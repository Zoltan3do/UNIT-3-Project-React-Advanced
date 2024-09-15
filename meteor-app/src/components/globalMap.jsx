/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function GlobalMap({ coord, setPosition }) {
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                console.log(coord)
            },
        });
        return null;
    };


    return (
        <>
            <h3 className='text-light text-start mt-lg-4 mt-5 ms-3 fw-semibold mb-3'>Global Map</h3>
            <MapContainer center={[43.11, 12.23]} zoom={2} zoomControl={false} style={{
                height: "300px", border: "none"
            }} className='rounded rounded-5 mappa' onClick={MapClickHandler}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                />
                <MapClickHandler />
            </MapContainer>
        </>


    )
}
export default GlobalMap