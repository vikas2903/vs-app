import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import  connectDB from './lib/dbconnect.js';
import userRoutes from './routes/userroute.js';
dotenv.config();

const app = express();  
const PORT = process.env.PORT || 3000;  
app.use(bodyParser.json()); 

// Routes
app.use('/api/users', userRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
}); 
app.listen(PORT, () => {
    console.log(`Port-${PORT}`);
}); 