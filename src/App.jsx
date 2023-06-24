import { useEffect, useState } from "react";
import Map from "./Map";
import taxiStations from "./stations";

const App = () => {
  const [dataSource, setDataSource] = useState("table");
  const [now, setNow] = useState(new Date());

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const hoursAndMinutesUntil = (date) => {
    const diff = date.valueOf() - now.valueOf();

    if (diff < 0) {
      return "Now";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `in ${hours}h ${minutes}m`;
  };

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 5000);
  }, []);

  return (
    <>
      <h1>Chicago Water Taxi Info (Unofficial)</h1>
      <p
        style={{
          marginBottom: "8px",
        }}
      >
        v0.2.4 | Made by{" "}
        <a href='https://piemadd.com/' target='_blank' rel='noreferrer'>
          Piero
        </a>
      </p>
      {
        <>
          <main>
            <div className='data-source-selector'>
              <button
                type='radio'
                name='data-source'
                id='table'
                value='table'
                onClick={(e) => {
                  console.log("Setting to", e.target.value);
                  setDataSource(e.target.value);
                }}
                className={
                  dataSource === "table" ? "data-source-selected" : undefined
                }
              >
                List
              </button>
              <button
                type='radio'
                name='data-source'
                id='map'
                value='map'
                onClick={(e) => {
                  console.log("Setting to", e.target.value);
                  setDataSource(e.target.value);
                }}
                className={
                  dataSource === "map" ? "data-source-selected" : undefined
                }
              >
                Map
              </button>
            </div>
            {dataSource === "table" ? (
              <>
                <p>
                  Fares on the water taxi are currently $6 one way, with tickets
                  being available at the Union/Ogilvie dock and on taxis.
                </p>
                <h2>Water Taxi Schedule:</h2>
                <section className='destinations'>
                  {Object.keys(taxiStations).map((stationKey) => {
                    const station = taxiStations[stationKey];
                    return (
                      <div
                        className='station'
                        key={stationKey}
                        style={{
                          backgroundColor: station.color,
                          color: station.textColor,
                        }}
                      >
                        <h2>{station.name}</h2>
                        <p>
                          <a
                            href={station.mapsLink}
                            target='_blank'
                            rel='noreferrer'
                            style={{
                              color: station.textColor,
                            }}
                          >
                            Directions
                          </a>
                        </p>
                        <h3>Upcoming Departures:</h3>
                        {Object.keys(station.to).map((destKey) => {
                          const dest = station.to[destKey];
                          const filteredDepartures = dest.departures.filter(
                            (departure) => {
                              return (
                                new Date(departure).valueOf() >
                                Date.now() - 1000 * 60 * 5
                              );
                            }
                          );
                          const departures = filteredDepartures.slice(0, 6);

                          if (departures.length === 0) {
                            return (
                              <div key={destKey}>
                                <h4>To {taxiStations[destKey].name}:</h4>
                                <p>No upcoming departures</p>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={destKey}
                              style={{
                                backgroundColor: taxiStations[destKey].color,
                                color: taxiStations[destKey].textColor,
                              }}
                            >
                              <h4>To {taxiStations[destKey].name}:</h4>
                              <p>
                                Travel time: ~{station.to[destKey].duration}{" "}
                                mins
                              </p>
                              <ul>
                                {departures.map((departure) => {
                                  return (
                                    <li key={departure}>
                                      {dateFormatter.format(
                                        new Date(departure)
                                      )}{" "}
                                      <i>
                                        (
                                        {hoursAndMinutesUntil(
                                          new Date(departure)
                                        )}
                                        )
                                      </i>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </section>
              </>
            ) : null}
            {dataSource === "map" ? <Map /> : null}
            <p
              style={{
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              While this website was made for your convenience, it is
              unofficial, has no affiliation with the Chicago Water Taxi nor
              Wendella Boat Tours, and makes no guarentee for information
              accuracy. For official information, please visit{" "}
              <a
                href='https://www.chicagowatertaxi.com'
                target='_blank'
                rel='noreferrer'
              >
                chicagowatertaxi.com
              </a>
              .
            </p>
            <p>This site uses google analytics. </p>
          </main>
        </>
      }
    </>
  );
};

export default App;
