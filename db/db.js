import mongoose from "mongoose"

export const connectToDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/job-queue");
        console.log("Connected to db");
    }
    catch(error) {
        console.log("Error connecting to db: ", error);
        process.exit(1);
    }
}