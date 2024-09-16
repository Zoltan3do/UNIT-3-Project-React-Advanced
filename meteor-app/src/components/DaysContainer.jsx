/* eslint-disable react/prop-types */
import Today from "./Today";
import DaysAfter from "./DaysAfter"

function DaysContainer({ today, dates5 }) {
    return (
        <>
        <h3 className="text-light text-start mt-5 ms-3 fw-semibold">Prossimi 5 giorni</h3>
            {today && today.dt ? (
                <div className="d-flex mt-4 container mb-4 ">
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-md-4">
                            <Today dt={today.dt} datas={today} />
                        </div>
                        <div className="col-6 col-md-2 col-sm-3 ">
                            <DaysAfter dt={dates5.list[8].dt} datas={dates5.list[0]} />
                        </div>
                        <div className="col-6 col-md-2 col-sm-3">
                            <DaysAfter dt={dates5.list[16].dt} datas={dates5.list[8]} />
                        </div>
                        <div className="col-6 col-md-2 col-sm-3 mt-5  mt-sm-0">
                            <DaysAfter dt={dates5.list[24].dt} datas={dates5.list[16]} />
                        </div>
                        <div className="col-6 col-md-2 col-sm-3 mt-5  mt-sm-0">
                            <DaysAfter dt={dates5.list[32].dt} datas={dates5.list[24]} />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default DaysContainer;
