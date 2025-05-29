import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import backgroundImage from '../assets/form.jpg'; 


interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  competences: string;
}

const VolontaireForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: '',
    competences: ''
  });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8085/api/volontaires', formData); // Adapter l'URL de l'API
      setSubmitted(true);
      setShowConfetti(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données', error);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12 relative"
    style={{ backgroundImage: `url(${backgroundImage})` }} // Utilisation de l'image importée
  >
      {showConfetti && <Confetti />}

      <motion.div
        className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mb-6">
          {submitted ? 'Merci de rejoindre notre équipe !' : 'Devenez Volontaire 💚'}
        </h2>

        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              step === 1 ? 'w-1/3 bg-green-400' :
              step === 2 ? 'w-2/3 bg-blue-400' : 'w-full bg-purple-500'
            }`}
          ></div>
        </div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {step === 1 && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="👤 Nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-all hover:scale-105 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="📧 Adresse email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-all hover:scale-105 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center transform hover:scale-110 transition-all"
                >
                  <FaArrowRight className="mr-2" /> Suivant
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="🔐 Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 hover:scale-105 focus:outline-none"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 hover:scale-105 focus:outline-none"
                >
                  <option value="">🎭 Votre rôle</option>
                  <option value="volontaire">Volontaire</option>
                  <option value="citoyen">Citoyen</option>
                  <option value="utilisateur">Utilisateur</option>
                </select>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm text-gray-500 hover:underline flex items-center"
                  >
                    <FaArrowLeft className="mr-1" /> Retour
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center transform hover:scale-110 transition-all"
                  >
                    <FaArrowRight className="mr-2" /> Suivant
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <textarea
                  name="competences"
                  placeholder="💡 Parlez-nous de vos compétences..."
                  value={formData.competences}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 hover:scale-105 focus:outline-none h-24"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center transform hover:scale-110 transition-all"
                >
                  🚀 Envoyer
                </button>
              </>
            )}
          </motion.form>
        ) : (
          <motion.div
            className="text-center text-green-700 text-lg font-medium mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🎉 Merci <strong>{formData.name}</strong> de nous avoir rejoints 💚<br />
            Nous vous contacterons à <em>{formData.email}</em> très bientôt ! 🌟
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VolontaireForm;
  