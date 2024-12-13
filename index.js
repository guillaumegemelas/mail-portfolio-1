const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurer Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.json({ message: "Hello vous!" });
});

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, message } = req.body;

  const mailOptions = {
    from: `${nom} ${prenom} <${email}>`,
    to: "guillaumegemelas@gmail.com",
    subject: "Formulaire de contact",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${3000}`);
});
