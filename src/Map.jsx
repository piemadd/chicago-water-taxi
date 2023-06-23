/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import * as pmtiles from "pmtiles";
import layers from "protomaps-themes-base";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import taxiStations from "./stations";
import mapLines from "./lines.json";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-87.6298209611486);
  const [lat] = useState(41.87433196355158);
  const [zoom] = useState(12.67);

  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  useEffect(() => {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const hoursAndMinutesUntil = (date) => {
      const now = new Date();
      const diff = date.valueOf() - now.valueOf();

      if (diff < 0) {
        return "Now";
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `in ${hours}h ${minutes}m`;
    };

    //if (map.current) return; // initialize map only once

    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        id: "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
        name: "MapLibre",
        zoom: 0,
        pitch: 0,
        center: [41.884579601743276, -87.6279871036212],
        glyphs:
          "https://cdn.jsdelivr.net/gh/piemadd/fonts@54b954f510dc79e04ae47068c5c1f2ee39a69216/_output/{fontstack}/{range}.pbf",
        layers: layers("protomaps", "black"),
        bearing: 0,
        sources: {
          protomaps: {
            type: "vector",
            tiles: [
              "https://tilea.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              "https://tileb.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              "https://tilec.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              "https://tiled.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              //"http://10.0.0.237:8081/basemap/{z}/{x}/{y}.mvt"
            ],
            maxzoom: 13,
          },
        },
        version: 8,
        metadata: {},
      },
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 16,
    });

    map.current.on("load", () => {
      map.current.on("moveend", () => {
        console.log(
          `Map moved to ${map.current.getCenter()} with zoom ${map.current.getZoom()}`
        );
      });

      Object.keys(taxiStations).forEach((stationKey) => {
        const station = taxiStations[stationKey];
        const popup = new maplibregl.Popup({
          offset: 40,
          maxWidth: 360,
          anchor: "bottom",
        }).setHTML(
          `<h2>${station.name}</h2>
            <br/>
            <p><a href='${
              station.mapsLink
            }' target='_blank' rel='noreferrer'>Directions</a></p>
            <br/>
            <h3 class='station_popup'>Upcoming Departures:</h3>
            ${Object.keys(station.to)
              .map((destKey) => {
                console.log("destKey", destKey);
                console.log("station.to", station.to[destKey]);
                const dest = station.to[destKey];
                const filteredDepartures = dest.departures.filter(
                  (departure) => {
                    return (
                      new Date(departure).valueOf() > Date.now() - 1000 * 60 * 5
                    );
                  }
                );
                const departures = filteredDepartures.slice(0, 6);

                if (departures.length === 0) {
                  return `<h4 class='station_popup'>To ${taxiStations[destKey].name}:</h4>
                  <p class='station_popup'>No upcoming departures</p>`;
                }

                return `
                <h4 class='station_popup'>To ${taxiStations[destKey].name}:</h4>
                <p class='station_popup'>Travel time: ~${
                  station.to[destKey].duration
                } mins</p>
                <ul>  
                ${departures
                  .map((departure) => {
                    return `<li class='station_popup'>${dateFormatter.format(
                      new Date(departure)
                    )} <i>(${hoursAndMinutesUntil(
                      new Date(departure)
                    )})</i></li>`;
                  })
                  .join("")}
                    </ul>
              `;
              })
              .join("")}
            `
        );

        new maplibregl.Marker({
          color: station.color,
          properties: station,
        })
          .setLngLat([station.coordinates[1], station.coordinates[0]])
          .setPopup(popup)
          .addTo(map.current);
      });

      map.current.addSource("lines", {
        type: "geojson",
        data: mapLines,
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "lines",
        layout: {
          "line-join": "round",
          "line-round-limit": 0.1,
        },
        paint: {
          "line-color": "#fdd323",
          "line-width": 4,
        },
      });
    });

    console.log("Map initialized");
  });

  return (
    <>
      <div ref={mapContainer} className='map'></div>

      <div
        style={{
          textAlign: "right",
          marginBottom: "8px",
        }}
      >
        Map Attribution:{" "}
        <a href='https://protomaps.com' target='_blank' rel='noreferrer'>
          Protomaps
        </a>{" "}
        |{" "}
        <a
          href='https://openstreetmap.org/copyright'
          target='_blank'
          rel='noreferrer'
        >
          © OpenStreetMap
        </a>{" "}
        | <span>© Amtraker Tiles</span>
      </div>
    </>
  );
};

export default Map;
