/* eslint-disable react/prop-types */
function BigCity({ stato, citta, descrizione, gradi, icona, lat, lon, setPos }) {
    const handleClick = () => {
        setPos([lat, lon]);
    };

    return (
        lat && lon &&
        <div className="container city-container py-2 px-4 rounded rounded-5 mb-3">
            <div className="row align-items-center">
                <div className="col-9 text-light text-start">
                    <p className="text-secondary mb-0">{stato}</p>
                    <p className="mt-0 citta" onClick={handleClick}>{citta}</p>
                    <small>{descrizione.toUpperCase()}</small>
                </div>
                <div className="col-3 text-light fs-2">
                    <i className={`bi ${icona}`}></i>
                    <p>{gradi}°</p>
                </div>
            </div>
        </div>
    );
}

export default BigCity;
