import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const updateCarMarker = (mapRef, carMarkerRef, position) => {
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
  
  export default updateCarMarker;
  