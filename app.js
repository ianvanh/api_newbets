const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const BASE_URL = 'https://api.betmines.com/betmines/v1';

const HEADERS = {
  "User-Agent": "Mozilla/5.0",
  Accept: "application/json",
  Origin: "https://www.betmines.com",
  Referer: "https://www.betmines.com/"
};

const TIMEOUT = 20000;

app.get('/fixtures', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/fixtures`, {
      headers: HEADERS,
      timeout: TIMEOUT
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error en /fixtures:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/fixture/:id', async (req, res) => {
  const matchId = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/fixtures/${matchId}`, {
      headers: HEADERS
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(`Error en /fixture/${matchId}:`, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Api on port: ${PORT}`));
