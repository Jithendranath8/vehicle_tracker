const drawPathOnMap = (mapRef, completedPathRef, coordinates) => {
    // Step 1: I added the `fetchPath` function to retrieve path coordinates from the backend and update the state.
    completedPathRef.current.push(...coordinates);
  
    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: completedPathRef.current,
      },
    };
  
    // Step 2: I used the `drawPathOnMap` utility to render the fetched path dynamically on the map.
    if (mapRef.current.getSource("route")) {
      mapRef.current.getSource("route").setData(geojson);
    } else {
      mapRef.current.addSource("route", { type: "geojson", data: geojson });
  
      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#0074d9", "line-width": 4 },
      });
    }
  };
  
  export default drawPathOnMap;
  