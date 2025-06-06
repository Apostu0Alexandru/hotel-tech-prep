import { Router } from 'express';
import hotelController from '../../../controllers/hotel.controller';
import { authenticateToken } from '../../../middleware/auth';

const router = Router();

// Public routes (Requirement 6 - public route)
router.get('/', hotelController.getAllHotels);
router.get('/:name', hotelController.getHotelByName);

// Protected routes (Requirement 6 - protected routes requiring authentication)
router.post('/', authenticateToken, hotelController.createHotel);
router.put('/:id', authenticateToken, hotelController.updateHotel);
router.delete('/:id', authenticateToken, hotelController.deleteHotel);

export default router;
