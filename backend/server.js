const express = require("express");
const cors = require("cors");
const fs = require("fs").promises; 
const path = require("path"); 
const app = express();

app.use(cors());
app.use(express.json());

let routeData = null;

// I Loaded Dummy Data at starting of server by IIFE
(async () => {
  try {
    const filePath = path.join(__dirname, "dummydata.json");
    const data = await fs.readFile(filePath, { encoding: "utf-8" }); 
    routeData = JSON.parse(data); 
    console.log("Dummy data loaded successfully.");
  } catch (error) {
    console.error("Error loading dummy data:", error.message);
  }
})();

// this is endpoint to get data from server
app.get("/api/location", (req, res) => {
  if (routeData) {
    res.json(routeData);
  } else {
    res.status(500).json({ error: "Data not available" });
  }
});

const PORT = 3040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
