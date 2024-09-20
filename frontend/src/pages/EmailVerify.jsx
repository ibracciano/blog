// import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../utils/api";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(otp);

    // envoi du formulaire vers le backend pour créer un nouvel utilisateur
    try {
      const response = await axios.post(api.EmailVerify, { code: otp });
      if (response.data.success) {
        // afficher un message de succès
        toast.success(response.data.message);
        // vider le formulaire
        setOtp("");
        setTimeout(() => {
          // redirection vers la page de connexion
          navigate("/sign-in");
        }, 1000);
      }

      //   console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
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
            Code de vérification
          </h1>
          {/* formulaire d'inscription */}
          <form onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                backgroundColor: "black",
                width: "100%",
                height: "50px",
                borderRadius: "5px",
              }}
            />

            {/* bouton de soumission du formulaire */}
            <button
              type="submit"
              className="w-full py-2 mt-5 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-2 focus:ring-white"
            >
              Envoyer
            </button>
          </form>
          <p className="mt-4 text-transparent animate-bounce bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
            Veuillez verifier votre boîte e-mail
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default EmailVerify;
