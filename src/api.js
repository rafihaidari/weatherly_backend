import rateLimit from "express-rate-limit";
import express, { Router } from "express";
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));
import serverless from "serverless-http";
import axios from "axios";

const app = express();
const router = Router();

const limiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

router.use(limiter); // Apply rate limiting middleware to the router

router.get("/", async (req, res) => {
  const location = "Herat, Afghanistan";
  const API_KEY = "QVHENTGF26TFW35PXAL39RVA2";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;

  try {
    const apiRes = await axios(url);
    const json = await apiRes.json();

    // Send JSON response with fetched data
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(`/.netlify/functions/api`, router);

export default app;
export const handler = serverless(app);
