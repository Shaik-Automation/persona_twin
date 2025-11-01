import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your.email@gmail.com",        // your Gmail address
    pass: "your_app_password"            // create App Password in Google Account
  }
});

let interestCount = 179;

app.post("/api/interest", async (req, res) => {
  interestCount++;

  const mailOptions = {
    from: '"PersonaCloud" <your.email@gmail.com>',
    to: "your.email@gmail.com",
    subject: "New PersonaCloud Interest!",
    text: `Someone clicked "YES". Current total count: ${interestCount}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent!");
    res.json({ success: true, count: interestCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
