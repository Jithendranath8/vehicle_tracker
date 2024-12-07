import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { fetchPathData } from "../services/api";
import { INITIAL_VIEW_STATE } from "../constants/config";
import drawPathOnMap from "./RoutePath";
import updateCarMarker from "./VehicleMarker";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = process.env.REACT_APP_MAPGL_ACCESS_TOKEN;

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const carMarkerRef = useRef(null);
  const completedPathRef = useRef([]);
  const [coordinates, setCoordinates] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      ...INITIAL_VIEW_STATE,
    });

    fetchPath();

    return () => mapRef.current.remove();
  }, []);

  const fetchPath = async () => {
    try {
      const pathCoordinates = await fetchPathData();
      setCoordinates(pathCoordinates);
      drawPathOnMap(mapRef, completedPathRef, pathCoordinates);
    } catch (error) {
      console.error("Error fetching path data:", error);
    }
  };

  const startVehicleMovement = () => {
    if (coordinates.length === 0) {
      console.error("No path coordinates available!");
      return;
    }

    setIsStarted(true);

    let index = 0;
    const carMovementInterval = setInterval(() => {
      if (index < coordinates.length) {
        updateCarMarker(mapRef, carMarkerRef, coordinates[index]);
        index++;
      } else {
        clearInterval(carMovementInterval);
        setIsStarted(false);
      }
    }, 1500);
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container"></div>
      <button
        className={`start-button ${isStarted ? "disabled" : ""}`}
        onClick={startVehicleMovement}
        disabled={isStarted}
        style={{backgroundColor:"#245fe6",
            width:"150px",
            height:"50px",
            fontSize:"30px",
            position:"absolute",
            margin:"15px",
            left:"43vw",
            color:"white",
            border:"none"
        }}
      >
        {isStarted ? "Moving..." : "Start"}
      </button>
    </div>
  );
};

export default MapContainer;
