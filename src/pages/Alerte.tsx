import React, { useEffect, useState } from 'react';
import { Catastrophe, fetchCatastrophes } from '../Api/AlerteApi';
import Alerts from '../components/Alerts';
import Footer from '../components/footer';

// Fonction de mapping des niveaux d’urgence
const mapNiveauToLevel = (niveauUrgence: string): "low" | "medium" | "high" => {
  const normalized = niveauUrgence.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes('elevee') || normalized.includes('eleve') || normalized.includes('critique')) {
    return 'high';
  } else if (normalized.includes('moyenne') || normalized.includes('moyen')) {
    return 'medium';
  } else if (normalized.includes('faible')) {
    return 'low';
  } else {
    return 'low'; // valeur par défaut
  }
};

const Alerte: React.FC = () => {
  const [catastrophes, setCatastrophes] = useState<Catastrophe[]>([]);

  useEffect(() => {
    fetchCatastrophes()
    .then(data => {
    const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setCatastrophes(sorted);
    })
    .catch(console.error);
    }, []);

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-28 font-sans">
<h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        🚨 Alertes de catastrophes
      </h2>

      {catastrophes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: 18 }}>Aucune alerte pour le moment.</p>
      ) : (
    //    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
    {catastrophes.map(cat => (
            <Alerts
              key={cat.id}
              title={cat.type}
              description={`Coordonnées : ${cat.latitude.toFixed(3)}°, ${cat.longitude.toFixed(3)}°\nDate début : ${new Date(cat.date).toLocaleDateString()}`}
              location={cat.pays}
              date={cat.date}
              level={mapNiveauToLevel(cat.niveauUrgence)}
            />
          ))}
        </div>
      )}
    </div>
     <Footer />
     </>
  );
};

export default Alerte;
