import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { loadConfigFromFile } from "vite";

const PORT = 3001;
const BASE_URL = "https://v6.exchangerate-api.com/v6";
dotenv.config();

const app = express();

app.use(cors());

app.get("/currency", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(
      `${BASE_URL}/${process.env.CURRENCY_API_KEY}/pair/NOK/${query}/100`
    );
    const result = await response.json();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error, "error fetching data");
  }
});

// Create server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
