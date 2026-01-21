import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFound } from './middleware/error';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'LaundryPro API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      orders: '/api/orders',
      services: '/api/services',
      admin: '/api/admin',
    },
  });
});

app.use('/api', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║     LaundryPro API Server                     ║
╠══════════════════════════════════════════════╣
║  Status: 🟢 Running                          ║
║  Port: ${PORT}                               ║
║  Environment: ${process.env.NODE_ENV || 'development'}     ║
║  Time: ${new Date().toLocaleString()}        ║
╚══════════════════════════════════════════════╝
  `);
  console.log('API Endpoints:');
  console.log(`  → Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  → Auth:        http://localhost:${PORT}/api/auth`);
  console.log(`  → Orders:      http://localhost:${PORT}/api/orders`);
  console.log(`  → Services:    http://localhost:${PORT}/api/services`);
  console.log(`  → Admin:       http://localhost:${PORT}/api/admin`);
});

export default app;
