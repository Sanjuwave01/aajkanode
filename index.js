import express from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 4004;
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

//trc20usdt.ts routes
import trc20usdt from './routes/trc20usdt.js';
import bep20usdt from './routes/bep20usdt.js';
import jwroute from './routes/jw.js';

app.use('/api/v1/trc20usdt',trc20usdt)
app.use('/api/v1/bep20usdt',bep20usdt)
app.use('/api/v1/jw',jwroute)