export const fetchPathData = async () => {
    const response = await fetch(
      "https://vehicle-tracker-server.vercel.app/api/location"
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.map((point) => [point.longitude, point.latitude]);
  };
  