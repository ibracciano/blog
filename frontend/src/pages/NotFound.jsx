// import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Oups ! La page que vous recherchez n'existe pas.
      </p>
      <Link to="/" style={styles.link}>
        Retourner à l'accueil
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "3rem",
    margin: "20px 0",
    color: "#333",
  },
  text: {
    fontSize: "1.2rem",
    margin: "10px 0",
  },
  link: {
    fontSize: "1rem",
    color: "#007bff",
    textDecoration: "none",
    marginTop: "20px",
  },
};

export default NotFound;
