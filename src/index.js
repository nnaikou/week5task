import "./styles.css";
import "./leaflet.css";
import L from "./leaflet";

/*let xVar = 0;*/

const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res = await fetch(url);
  const data = await res.json();

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map", {
    minZoom: -3,
  });

  let geoJson = L.geoJSON(data, {
    weight: 2,
    onEachFeature: getFeature,
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

const getFeature = async (feature, layer) => {
  const name = feature.properties.name;
  layer.bindTooltip(name);

  /*const negOneValue = giveNegData();
  const posOneValue = givePosData();
  layer.bindPopup(
    `<ul>
      <li>Positive mig: ${posOneValue}</li>
      <li>Negative mig: ${negOneValue}</li>
    </ul>`
  );

  xVar++;*/

  /*console.log(feature.properties.name)*/
};

/*async function giveNegData() {
  const url1 =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
  const res1 = await fetch(url1);
  const negData = await res1.json();
  const values = Object.values(negData.dataset.value);
  return values[xVar];
}

async function givePosData() {
  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";
  const res2 = await fetch(url2);
  const posData = await res2.json();
  const values = Object.values(posData.dataset.value);
  return values[xVar];
}*/

fetchData();
