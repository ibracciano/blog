// import React from 'react'

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";

const ResetPassword = () => {
  const navigate = useNavigate();

  // récupération des paramètres de l'URL
  const { token } = useParams();
  console.log(token);

  const [user, setUser] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    // envoi du formulaire vers le backend pour créer un nouvel utilisateur
    try {
      const response = await axios.post(`${api.resetPassword}/${token}`, user);

      // afficher un message de succès
      toast.success(response.data.message);
      // vider le formulaire
      setUser({ password: "" });
      setTimeout(() => {
        // redirection vers la page de connexion
        navigate("/sign-in");
      }, 1000);

      //   console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      // console.log("erreur composant resetPassword", error.message);
    }
  };

  return (
    <main className="h-screen text-white greenGradient backdrop-blur-xl">
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-lg shadow greenGradient backdrop-blur-2xl backdrop-opacity-50"
        >
          <h1 className="mb-6 text-3xl font-bold text-center">
            Mot de passe oublié
          </h1>
          {/* formulaire d'inscription */}
          <form onSubmit={handleSubmit}>
            {/* champs d'entrée pour l'email */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium ">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
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

export default ResetPassword;
