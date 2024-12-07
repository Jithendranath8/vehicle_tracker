import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { fetchPathData } from "../services/api";
import { INITIAL_VIEW_STATE } from "../constants/config";
import drawPathOnMap from "./RoutePath";
import updateCarMarker from "./VehicleMarker";
import "mapbox-gl/dist/mapbox-gl.css";

// Step1: I set up the Mapbox integration in my React project by initializing the map and configuring the access token.
mapboxgl.accessToken = process.env.REACT_APP_MAPGL_ACCESS_TOKEN;

const MapContainer = () => {
  // Step2: I created a `MapContainer` component with `useRef` and `useEffect` to manage the map lifecycle.
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const carMarkerRef = useRef(null);
  const completedPathRef = useRef([]);
  const [coordinates, setCoordinates] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Step3: I set up the map instance and initialized it with the provided `INITIAL_VIEW_STATE`.
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      ...INITIAL_VIEW_STATE,
    });

    fetchPath();

    return () => mapRef.current.remove(); // Step9: I ensured the map instance is properly removed during cleanup in the `useEffect` hook.
  }, []);

  const fetchPath = async () => {
    try {
      // Step4: I added the `fetchPath` function to retrieve path coordinates from the backend and update the state.
      const pathCoordinates = await fetchPathData();
      setCoordinates(pathCoordinates);
      drawPathOnMap(mapRef, completedPathRef, pathCoordinates); // Step5: I used the `drawPathOnMap` utility to render the fetched path dynamically on the map.
    } catch (error) {
      console.error("Error fetching path data:", error);
    }
  };

  const startVehicleMovement = () => {
    if (coordinates.length === 0) {
      console.error("No path coordinates available!");
      return;
    }

    setIsStarted(true); // Step6: I integrated the `updateCarMarker` utility to update the car marker's position on the map at each interval.

    let index = 0;
    const carMovementInterval = setInterval(() => {
      if (index < coordinates.length) {
        updateCarMarker(mapRef, carMarkerRef, coordinates[index]);
        index++;
      } else {
        clearInterval(carMovementInterval);
        setIsStarted(false); // Step7: I updated the code to disable the "Start" button when the vehicle movement is already in progress.
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
        style={{
          backgroundColor: "#245fe6",
          width: "150px",
          height: "50px",
          fontSize: "30px",
          position: "absolute",
          margin: "15px",
          left: "43vw",
          color: "white",
          border: "none",
        }}
      >
        {isStarted ? "Moving..." : "Start"} {/* Step8: I styled the "Start" button to improve the user interface, ensuring proper placement and accessibility. */}
      </button>
    </div>
  );
};

export default MapContainer;
