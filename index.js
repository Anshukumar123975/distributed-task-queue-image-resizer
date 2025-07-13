import app from "./app.js";
import { createServer } from "http";
import { connectToDB } from "./db/db.js";
import dotenv from "dotenv"

dotenv.config();

const server = createServer(app);
const PORT = 9300;

connectToDB()
    .then(() => {
        server.listen(PORT,() => {
            console.log(`Server running on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to db");
    })