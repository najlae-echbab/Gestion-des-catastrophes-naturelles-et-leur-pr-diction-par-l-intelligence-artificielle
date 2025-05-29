import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import AboutImage from '../assets/home_page.jpg'; // ajoute une image appropriée
import { FaUsers, FaBullseye, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';


const services = [
    {
      title: "Coordination Efficace",
      desc: "Communication fluide entre secours, autorités et citoyens pour des interventions rapides.",
      icon: (
        <svg className="w-14 h-14 text-green-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      title: "Ressources Disponibles",
      desc: "Distribution rapide de matériel, vivres, soins et informations pour les zones touchées.",
      icon: (
        <svg className="w-14 h-14 text-green-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" />
          <path d="M12 21v-4" />
          <path d="M9 17h6" />
        </svg>
      ),
    },
    {
      title: "Prédictions IA",
      desc: "Systèmes intelligents pour analyser les données et anticiper les risques naturels.",
      icon: (
        <svg className="w-14 h-14 text-green-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 17v-6a4 4 0 018 0v6" />
          <path d="M12 21v-4" />
          <path d="M5 7h14" />
        </svg>
      ),
    },
  ];
function About() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <img
          src={AboutImage}
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
        {/* Services clés */}
        <section className="py-24 bg-gray-50">
        <div className="text-center mb-16 px-6">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-800"
          >
            Nos Services Clés
          </motion.h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-green-200 transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {service.icon}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Citation inspirante */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6"
        >
          <svg className="w-12 h-12 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12h.01M15 12h.01M9.75 17h4.5a2.25 2.25 0 100-4.5h-.75m-3 0H9a2.25 2.25 0 100 4.5z" />
          </svg>
          <blockquote className="text-2xl italic text-gray-700 font-medium leading-relaxed">
            « Ensemble, grâce à la technologie et à la solidarité, nous pouvons protéger ce qui compte le plus. »
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Retour en haut ↑
          </button>
        </motion.div>
      </section>
    

      <Footer />
    </>
  );
}

export default About;
