const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Dummy Data 
const routeData = [
    { "latitude": 17.37452151184752, "longitude": 78.47616897911128, "timestamp": "2024-12-05T10:00:00Z" },
    { "latitude": 17.377626394414072, "longitude": 78.47834206526478, "timestamp": "2024-12-05T10:00:10Z" },
    { "latitude": 17.379136424396467, "longitude": 78.4789197139247, "timestamp": "2024-12-05T10:00:20Z" },
    { "latitude": 17.381940732746262, "longitude": 78.4816321511104, "timestamp": "2024-12-05T10:00:30Z" },
    { "latitude": 17.38486483771463, "longitude": 78.48419389745472, "timestamp": "2024-12-05T10:00:40Z" },
    { "latitude": 17.385080548515482, "longitude": 78.48733329234555, "timestamp": "2024-12-05T10:00:50Z" },
    { "latitude": 17.387045901877443, "longitude": 78.4863286859805, "timestamp": "2024-12-05T10:01:00Z" },
    { "latitude": 17.390136723959145, "longitude": 78.4855017938623, "timestamp": "2024-12-05T10:01:10Z" },
    { "latitude": 17.390789698656764, "longitude": 78.48903154105315, "timestamp": "2024-12-05T10:01:20Z" },
    { "latitude": 17.393197836127477, "longitude": 78.48958976476638, "timestamp": "2024-12-05T10:01:30Z" },
    { "latitude": 17.398343723150187, "longitude": 78.49325501172629, "timestamp": "2024-12-05T10:01:40Z" },
    { "latitude": 17.399228787032644, "longitude": 78.49430632552331, "timestamp": "2024-12-05T10:01:50Z" },
    { "latitude": 17.40045837753981, "longitude": 78.49489663100519, "timestamp": "2024-12-05T10:02:00Z" },
    { "latitude": 17.402855946460953, "longitude": 78.4952972486376, "timestamp": "2024-12-05T10:02:10Z" },
    { "latitude": 17.405195284141207, "longitude": 78.4959102389352, "timestamp": "2024-12-05T10:02:20Z" },
    { "latitude": 17.407890199772638, "longitude": 78.49710747483097, "timestamp": "2024-12-05T10:02:30Z" },
    { "latitude": 17.410711091843197, "longitude": 78.49783934810196, "timestamp": "2024-12-05T10:02:40Z" },
    { "latitude": 17.41687835161248, "longitude": 78.49892413007477, "timestamp": "2024-12-05T10:02:50Z" },
    { "latitude": 17.420759737162143, "longitude": 78.50073210012579, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.424093749114274, "longitude": 78.50166886758356, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.428547741351842, "longitude": 78.50220751200531, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.430432089964484, "longitude": 78.50503539521948, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.433442165698168, "longitude": 78.5060872594559, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.43418238467643, "longitude": 78.5059141951675, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.43294776723902, "longitude": 78.49953785984908, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.4332448155353, "longitude":  78.49725786399155, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.43381962675071, "longitude": 78.4958687982828, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.433324650534622, "longitude": 78.49409481075116, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.432334694074132, "longitude": 78.49300698820817, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.430904384214436, "longitude": 78.49248956149134, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.429097018600956, "longitude": 78.49237009815573, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.42772008157959, "longitude": 78.49121507890821, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.425371940770404, "longitude": 78.48912349975431, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.419374180275547, "longitude": 78.48438073203303, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.41674411565531, "longitude": 78.4812776182035, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.414858091528167, "longitude": 78.47954253416059, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.412005507292506, "longitude": 78.47782564457506, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.40601254447715, "longitude": 78.47720651927851, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.401964067716964, "longitude": 78.47589513609854, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.397042238357734, "longitude": 78.47518226727306, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.393668997856295, "longitude": 78.47613550175127, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude": 17.389954571178826, "longitude": 78.47633409226758, "timestamp": "2024-12-05T10:03:00Z" },
    { "latitude":  17.385747323344326, "longitude": 78.48018674828371, "timestamp": "2024-12-05T10:03:00Z" },

];

let currentIndex = 0;

app.get("/api/location", (req, res) => {
  res.json(routeData);
});

const PORT = 3040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
