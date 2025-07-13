import jobRoutes from "./routes/jobs.routes.js"
import cors from "cors"
import express from "express"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/job",jobRoutes);

export default app;