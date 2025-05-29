import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Map from '../components/Map';
import Homeimage from '../assets/home_page.jpg';
import Alerts from '../components/Alerts';
import Footer from '../components/footer';
import Temoignage from '../components/Temoignage';
import Blogs from '../components/Blogs';
import { Catastrophe, fetchCatastrophes } from '../Api/AlerteApi';

const mapNiveauToLevel = (niveauUrgence: string): "low" | "medium" | "high" => {
  const normalized = niveauUrgence.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (normalized.includes('elevee') || normalized.includes('eleve') || normalized.includes('critique')) {
    return 'high';
  } else if (normalized.includes('moyenne') || normalized.includes('moyen')) {
    return 'medium';
  } else if (normalized.includes('faible')) {
    return 'low';
  } else {
    return 'low';
  }
};

const blogPosts = [
  {
    title: "Comment se préparer aux séismes : Guide complet",
    date: "2025-04-15",
    excerpt: "Découvrez les meilleures pratiques pour se préparer à un séisme et sauver des vies en cas de catastrophe.",
    link: "#",
  },
  {
    title: "Les inondations : Causes, Conséquences et Préventions",
    date: "2025-04-10",
    excerpt: "Tout savoir sur les inondations : leurs causes, leurs impacts et comment se protéger efficacement.",
    link: "#",
  },
  {
    title: "Les tempêtes de sable : Comment survivre et se protéger",
    date: "2025-04-08",
    excerpt: "Découvrez comment vous protéger des tempêtes de sable et minimiser les risques pour votre santé.",
    link: "#",
  },
];

function Home() {
  const [recentAlerts, setRecentAlerts] = useState<Catastrophe[]>([]);

  useEffect(() => {
    fetchCatastrophes()
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentAlerts(sorted.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <img
          src={Homeimage}
          alt="home-image"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-rocknroll tracking-wide leading-snug text-center px-4 font-bold">
              Notre mission est de coordonner les secours, fournir des ressources et prédire les catastrophes naturelles pour sauver des vies et protéger les communautés.
            </h1>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="pt-1 p-10">
        <Map />
      </div>

      {/* Alertes */}
      <section className="pt-2 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Alertes</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recentAlerts.map((alert, index) => {
            const level = mapNiveauToLevel(alert.niveauUrgence);
            const cardColor = level === 'high' ? 'bg-red-100' : level === 'medium' ? 'bg-yellow-100' : 'bg-green-100';

            return (
              <div key={index} className={`transition transform ${cardColor} rounded-lg shadow-lg p-4`}>
                <Alerts
                  title={alert.type}
                  description={`Coordonnées : ${alert.latitude.toFixed(3)}°, ${alert.longitude.toFixed(3)}°\nDate début : ${new Date(alert.date).toLocaleDateString()}`}
                  location={alert.pays}
                  date={alert.date}
                  level={level}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Blog Section */}
      <Blogs posts={blogPosts} />

    

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
