import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import organizationRoutes from './routes/organizationRoutes';

const app = express();
const PORT = 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/organization', organizationRoutes);

app.listen(PORT, () => {
  console.log(`Pixell River API running on http://localhost:${PORT}`);
});
