import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import config from './config/env';
import { testConnection } from './config/database';
import { generateTestToken } from './middleware/auth';

// Import routes
import hotelRoutes from './routes/api/v1/hotels';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging for development
if (config.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.use('/api/v1/hotels', hotelRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    database: 'Connected'
  });
});

// Development helper endpoint for generating test tokens
if (config.NODE_ENV === 'development') {
  app.get('/dev/token', (req: Request, res: Response) => {
    const token = generateTestToken();
    res.json({
      success: true,
      message: 'Test token generated for development',
      token: token,
      usage: `Add to Authorization header as: Bearer ${token}`
    });
  });
}

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Hotel Management API',
    version: '1.0.0',
    endpoints: {
      hotels: '/api/v1/hotels',
      health: '/health',
      documentation: 'TypeScript REST API for 853,338 Sabre hotels'
    }
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Endpoint not found',
      path: req.originalUrl,
      method: req.method
    }
  });
});

// Start server function
const startServer = async (): Promise<void> => {
  try {
    await testConnection();
    
    const server = app.listen(config.PORT, () => {
      console.log(`Hotel Management API running on port ${config.PORT}`);
      console.log(`Database: ${config.database.name} (853,338 hotels ready)`);
      console.log(`Environment: ${config.NODE_ENV}`);
      console.log(`API Documentation: http://localhost:${config.PORT}/api/v1/hotels`);
      
      if (config.NODE_ENV === 'development') {
        console.log(`Test token: http://localhost:${config.PORT}/dev/token`);
      }
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export default app;
