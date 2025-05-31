import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import sequelize from './config/database';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: true, // Разрешаем все origins в режиме разработки
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to PostgreSQL and sync models
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Database sync error:', error);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 