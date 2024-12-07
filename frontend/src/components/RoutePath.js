const drawPathOnMap = (mapRef, completedPathRef, coordinates) => {
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
  