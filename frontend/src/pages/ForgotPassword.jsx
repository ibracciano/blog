// import React from 'react'
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    // envoi du formulaire vers le backend pour créer un nouvel utilisateur
    try {
      const response = await axios.post(api.forgotPassword, {
        email: user.email,
      });

      // afficher un message de succès
      toast.success(response.data.message);
      // vider le formulaire
      setUser({ email: "" });

      //   console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  return (
    <main className="h-screen text-white greenGradient backdrop-blur-xl ">
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-lg shadow greenGradient backdrop-blur-2xl backdrop-opacity-50 shadow-slate-800"
        >
          <h1 className="mb-6 text-3xl font-bold text-center">
            Mot de passe oublié
          </h1>
          {/* formulaire d'inscription */}
          <form onSubmit={handleSubmit}>
            {/* champs d'entrée pour l'email */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium ">
                Adresse Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-900 rounded-md backdrop-saturate-sm focus:outline-none focus:ring-green-400"
                required
              />
            </div>

            {/* bouton de soumission du formulaire */}
            <button
              type="submit"
              className="block w-full px-4 py-2 mt-5 text-sm font-medium text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-green-500 focus:outline-none focus:ring-green-400"
            >
              Envoyer
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default ForgotPassword;
