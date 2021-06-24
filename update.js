const fetch = require('node-fetch');
const osmtogeojson = require('osmtogeojson');
const togpx = require('togpx');
fs = require('fs');

let dati = require("./dati.json");

async function GetDati() {
    for (var sentiero in dati) {
        await fetch(dati[sentiero].query)
        .then(res => res.json())
        .then(async json => {
            fs.writeFile("./dati/" + sentiero.replace(".","") + ".json", JSON.stringify(json), (err) => console.log("scaricato " + sentiero));
            fs.writeFile("./geojson/" + sentiero.replace(".","") + ".geojson", JSON.stringify(osmtogeojson(json)), (err) => console.log("convertito geojson " + sentiero));
            fs.writeFile("./gpx/" + sentiero.replace(".","") + ".gpx", JSON.stringify(togpx(json)), (err) => console.log("convertito gpx " + sentiero));
        });
    }
}

GetDati();

//echo ($file | sed "s/json/geojson/g")