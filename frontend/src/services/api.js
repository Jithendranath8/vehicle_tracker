export const fetchPathData = async () => {
    const response = await fetch(
      "http://localhost:3040/api/location"
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log(data)
    return data.map((point) => [point.longitude, point.latitude]);
    
  };
  