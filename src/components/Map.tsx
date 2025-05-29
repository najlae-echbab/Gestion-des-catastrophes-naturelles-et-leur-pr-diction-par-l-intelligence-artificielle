import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Catastrophe, fetchCatastrophes } from '../Api/AlerteApi';

import fireIcon from '../assets/fire.png';
import floodIcon from '../assets/flood.png';
import earthquakeIcon from '../assets/earthquake.png';
import stormIcon from '../assets/storm.png';
import cycloneIcon from '../assets/cyclone.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';

// Crée une icône Leaflet personnalisée
const createIcon = (iconUrl: string) =>
new L.Icon({
iconUrl,
iconSize: [32, 32],
iconAnchor: [16, 32],
popupAnchor: [0, -32],
shadowUrl: shadowIcon,
shadowSize: [41,   41],
});

// Associe l’icône au type de catastrophe
const getDisasterIcon = (type: string) => {
const t = type.toLowerCase();
if (t.includes('incendie')) return createIcon(fireIcon);
if (t.includes('inondation') || t.includes('flood')) return createIcon(floodIcon);
if (t.includes('séisme') || t.includes('seisme') || t.includes('tremblement')) return createIcon(earthquakeIcon);
if (t.includes('tempête') || t.includes('tempete') || t.includes('storm')) return createIcon(stormIcon);
if (t.includes('cyclone') || t.includes('ouragan')) return createIcon(cycloneIcon);
return createIcon(earthquakeIcon); // fallback
};

// Détermine la couleur du niveau
const getUrgencyColor = (niveau: string) => {
const n = niveau.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
if (n.includes('eleve') || n.includes('critique')) return 'text-red-600';
if (n.includes('moyen') || n.includes('moyenne')) return 'text-yellow-500';
return 'text-green-600';
};

const Map = () => {
const [catastrophes, setCatastrophes] = useState<Catastrophe[]>([]);

useEffect(() => {
fetchCatastrophes().then(setCatastrophes).catch(console.error);
}, []);

return (
<div className="w-full h-[500px] mt-10 shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
<MapContainer
center={[20, 0]}
zoom={2}
scrollWheelZoom={true}
className="h-full w-full z-0"
>
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
{catastrophes.map((cat, idx) => (
      <Marker
        key={idx}
        position={[cat.latitude, cat.longitude]}
        icon={getDisasterIcon(cat.type)} // ✅ Applique l’icône personnalisée ici
      >
        <Popup>
          <div className="text-sm font-sans space-y-1">
            <div className="font-bold text-base">🌍 {cat.type}</div>
            <div className="text-gray-600">📍 {cat.pays}</div>
            <div className="text-gray-600">📅 {new Date(cat.date).toLocaleDateString()}</div>
            <div className={`font-semibold ${getUrgencyColor(cat.niveauUrgence)}`}>
              ⚠️ Niveau : {cat.niveauUrgence}
            </div>
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
</div>
);
};

export default Map;