/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "../assets/img/pngegg.png"
import { useState } from 'react';


function GlobalMap({ coord, setPosition }) {
    const [lastClick, setLastClick] = useState(null);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                setLastClick(e.latlng);
            },
        });
        return null;
    };


    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [20, 36],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const bounds = [
        [-90, -180], 
        [90, 180] 
    ];


    return (
        <>
            <h3 className='text-light text-start mt-lg-4 mt-5 ms-3 fw-semibold mb-3'>Global Map</h3>
            <MapContainer maxBounds={bounds} center={[43.11, 12.23]} zoom={2} minZoom={2} zoomControl={false} style={{
                height: "300px", border: "none"
            }} className='rounded rounded-5 mappa' onClick={MapClickHandler}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                />
                <MapClickHandler />
                {lastClick && (
                    <Marker position={lastClick} icon={customIcon} />
                )}
            </MapContainer>
        </>


    )
}
export default GlobalMap