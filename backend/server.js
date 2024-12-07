const express = require("express");
const cors = require("cors");
const fs = require('fs')
const app = express();

app.use(cors());
app.use(express.json());

// Dummy Data 
const routeData = fs.readFileSync("./dummydata.json" , 'utf-8');
console.log(routeData)


app.get("/api/location", (req, res) => {
  res.json(routeData);
});

const PORT = 3040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
