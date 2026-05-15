import express from "express";
import nodemailer from "nodemailer";
import Message from "../models/Message.js";

const router = express.Router();

function validateBody(req, res, next) {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: "Name, email, and message are required." });
  if (!String(email).includes("@")) return res.status(400).json({ error: "Please provide a valid email address." });
  next();
}

async function sendEmailNotification(savedMessage) {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) return;

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT || 587),
    secure: false,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  await transporter.sendMail({
    from: `"Empowering Futures Website" <${EMAIL_USER}>`,
    to: EMAIL_TO,
    subject: `New ${savedMessage.type} submission from ${savedMessage.name}`,
    text: `Type: ${savedMessage.type}\nName: ${savedMessage.name}\nEmail: ${savedMessage.email}\nPhone: ${savedMessage.phone || "N/A"}\n\nMessage:\n${savedMessage.message}`,
  });
}

async function handleSubmission(type, req, res) {
  try {
    const saved = await Message.create({ type, name: req.body.name, email: req.body.email, phone: req.body.phone, message: req.body.message });
    try { await sendEmailNotification(saved); } catch (e) { console.warn("Email notification failed:", e.message); }
    return res.status(201).json({ message: "Submission received successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}

router.post("/contact", validateBody, (req, res) => handleSubmission("contact", req, res));
router.post("/volunteer", validateBody, (req, res) => handleSubmission("volunteer", req, res));
router.post("/donation-interest", validateBody, (req, res) => handleSubmission("donation-interest", req, res));

export default router;
