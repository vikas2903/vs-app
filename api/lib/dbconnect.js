import mongoose from "mongoose";

const connectDB = async () => { 
    const  events_tracking_database = process.env.MONGO_URI_EVENTS
    try { 
        await mongoose.connect(events_tracking_database);
        console.log("MongoDB connected successfully");
         
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};  

export default connectDB;     