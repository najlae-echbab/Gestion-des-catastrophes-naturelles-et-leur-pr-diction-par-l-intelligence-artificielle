import React, { useEffect, useState } from "react";
import { fetchVolontaires, Volunteer } from "../Api/volontaireApi";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Volontaire_image from "../assets/volontaire_image.jpg";
import Temoignage from "../components/Temoignage";

export default function Volontaire() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolontaires()
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur : ", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <header
        className="mt-20 text-black py-20 text-center"
        style={{
          backgroundImage: `url(${Volontaire_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
          opacity: "0.9",
        }}
      >
        <p className="text-4xl font-serif mb-4 font-bold text-white pt-8 mt-4 mr-20 ml-20 shadow-md">
          Rejoignez une communauté de bénévoles engagés qui interviennent lors des catastrophes naturelles à travers tout le Maroc.
        </p>

        <Link
          to="/devenir-volontaire"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-400 transition transform hover:scale-105"
        >
          <UserPlus className="w-5 h-5" />
          Devenir volontaire
        </Link>
      </header>

      {/* Liste des volontaires */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Chargement des volontaires...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {volunteers.map((v) => (
              <article
                key={v.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 p-6 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700 mb-6">
                  {v.user.name[0]}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">{v.user.name}</h3>
                <p className="text-gray-500 mb-2">{v.user.role}</p>
                <p className="text-sm text-gray-400">{v.competences}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <Temoignage />
      <Footer />
    </>
  );
}
