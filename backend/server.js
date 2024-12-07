const express = require("express");
const cors = require("cors");
const fs = require("fs").promises; // Use promises for better async handling
const path = require("path"); // To resolve file paths
const app = express();

app.use(cors());
app.use(express.json());

let routeData = null;

// Load Dummy Data
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

app.get("/api/location", (req, res) => {
  if (routeData) {
    res.json(routeData);
  } else {
    res.status(500).json({ error: "Data not available" });
  }
});

const PORT = 3040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
