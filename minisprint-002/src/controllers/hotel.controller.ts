import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Hotel, City, Region } from '../models/associations';

class HotelController {
  // GET /hotels - Retrieve all hotels with basic filtering and pagination
  async getAllHotels(req: Request, res: Response): Promise<void> {
    try {
      const { page = '1', limit = '10', city, rating } = req.query;
      
      const pageNum = parseInt(page as string) || 1;
      const limitNum = Math.min(50, parseInt(limit as string) || 10); // Simple limit
      const offset = (pageNum - 1) * limitNum;

      // Simple filtering
      const whereClause: any = {};
      if (rating) {
        whereClause.SabrePropertyRating = { [Op.gte]: parseFloat(rating as string) };
      }

      const result = await Hotel.findAndCountAll({
        where: whereClause,
        include: [
          { model: City, as: 'city' },
          { model: Region, as: 'region' }
        ],
        limit: limitNum,
        offset,
        order: [['SabrePropertyRating', 'DESC']]
      });

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: result.count
        }
      });

    } catch (error) {
      console.error('Error retrieving hotels:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve hotels'
      });
    }
  }

  // GET /hotels/:name - Retrieve hotel by name
  async getHotelByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;

      const hotel = await Hotel.findOne({
        where: {
          GlobalPropertyName: { [Op.iLike]: `%${name}%` }
        },
        include: [
          { model: City, as: 'city' },
          { model: Region, as: 'region' }
        ]
      });

      if (!hotel) {
        res.status(404).json({
          success: false,
          error: 'Hotel not found'
        });
        return;
      }

      res.json({
        success: true,
        data: hotel
      });

    } catch (error) {
      console.error('Error retrieving hotel:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve hotel'
      });
    }
  }

  // POST /hotels - Create new hotel (protected route)
  async createHotel(req: Request, res: Response): Promise<void> {
    try {
      const hotelData = req.body;

      // Simple validation
      if (!hotelData.GlobalPropertyName) {
        res.status(400).json({
          success: false,
          error: 'Hotel name is required'
        });
        return;
      }

      const newHotel = await Hotel.create(hotelData);

      res.status(201).json({
        success: true,
        data: newHotel,
        message: 'Hotel created successfully'
      });

    } catch (error) {
      console.error('Error creating hotel:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to create hotel'
      });
    }
  }

  // PUT /hotels/:id - Update hotel by ID (protected route)
  async updateHotel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        res.status(404).json({
          success: false,
          error: 'Hotel not found'
        });
        return;
      }

      await hotel.update(updateData);

      res.json({
        success: true,
        data: hotel,
        message: 'Hotel updated successfully'
      });

    } catch (error) {
      console.error('Error updating hotel:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to update hotel'
      });
    }
  }

  // DELETE /hotels/:id - Delete hotel by ID (protected route)
  async deleteHotel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        res.status(404).json({
          success: false,
          error: 'Hotel not found'
        });
        return;
      }

      await hotel.destroy();

      res.json({
        success: true,
        message: 'Hotel deleted successfully'
      });

    } catch (error) {
      console.error('Error deleting hotel:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete hotel'
      });
    }
  }
}

export default new HotelController();
