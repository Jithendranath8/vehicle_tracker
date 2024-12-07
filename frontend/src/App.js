import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPGL_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const carMarkerRef = useRef(null);
  const completedPathRef = useRef([]); 

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.486671, 17.385044], 
      zoom: 13,
    });

    fetchPath();

    return () => mapRef.current.remove();
  }, []);

  const fetchPath = async () => {
    try {
      const response = await fetch("http://localhost:3040/api/location");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const coordinates = data.map((point) => [point.longitude, point.latitude]);
      drawPathOnMap(coordinates);
      animateCarAlongPath(coordinates);
    } catch (error) {
      console.error("Error fetching path data:", error);
    }
  };

  const drawPathOnMap = (coordinates) => {
    completedPathRef.current.push(...coordinates);

    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: completedPathRef.current,
      },
    };

    if (mapRef.current.getSource("route")) {
      mapRef.current.getSource("route").setData(geojson);
    } else {
      mapRef.current.addSource("route", {
        type: "geojson",
        data: geojson,
      });

      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0074d9",
          "line-width": 4,
        },
      });
    }
  };

  const animateCarAlongPath = (coordinates) => {
    if (coordinates.length === 0) return;

    let index = 0;

    const moveCar = () => {
      if (index < coordinates.length) {
        const position = coordinates[index];

        updateCarMarker(position);
        index += 1;
      } else {
        clearInterval(carMovementInterval);
      }
    };

    const carMovementInterval = setInterval(moveCar, 1500); 
  };

  const updateCarMarker = (position) => {
    if (!carMarkerRef.current) {

      const carElement = document.createElement("div");
      carElement.className = "car-marker";
      carElement.style.width = "40px";
      carElement.style.height = "40px";
      carElement.style.backgroundImage =
        "url('https://img.icons8.com/?size=100&id=QNXMW3NgF3oq&format=png&color=000000')";
      carElement.style.backgroundSize = "cover";

      carMarkerRef.current = new mapboxgl.Marker({
        element: carElement,
        rotationAlignment: "map",
      })
        .setLngLat(position)
        .addTo(mapRef.current);
    } else {
      carMarkerRef.current.setLngLat(position); 
    }
  };

  return (
    <div>
      <h1>Real-Time Vehicle Tracker</h1>
      <div
        ref={mapContainerRef}
        style={{ height: "80vh", width: "100vw" }}
      ></div>
      <style>
        {`
          .car-marker {
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </div>
  );
};

export default App;
