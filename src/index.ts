import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
const app = express();
const PORT = process.env.PORT || 3009;
import connectDB from './config/db';

app.use(express.json());
app.use(morgan("dev"));

app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on", PORT);
    })
})

