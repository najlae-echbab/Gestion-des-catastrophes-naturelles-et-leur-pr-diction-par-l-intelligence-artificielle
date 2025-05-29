import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/form.jpg';
import { sendContactMessage } from '../Api/contactApi'; // Assurez-vous que cette fonction est correctement définie dans votre API
interface ContactData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContactMessage(contactData);
      setSubmitted(true);
      setShowConfetti(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
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
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-28 relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-10 pointer-events-none"
        >
          {/* Confetti ici */}
        </motion.div>
      )}

      <motion.div
        className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mb-6">
          {submitted ? 'Merci pour votre message !' : 'Contactez-nous 📬'}
        </h2>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              name="name"
              placeholder="👤 Votre nom complet"
              value={contactData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-all hover:scale-105 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="📧 Votre adresse email"
              value={contactData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 transition-all hover:scale-105 focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="💬 Votre message"
              value={contactData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 hover:scale-105 focus:outline-none h-32 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center transform hover:scale-110 transition-all"
            >
              🚀 Envoyer
            </button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center text-green-700 text-lg font-medium mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🎉 Merci <strong>{contactData.name}</strong> pour votre message !<br />
            Nous vous répondrons à <em>{contactData.email}</em> rapidement. 🌟
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ContactUs;
