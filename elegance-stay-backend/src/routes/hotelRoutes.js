const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const { getHotels, createHotel, updateHotel, deleteHotel, getHotelById, upload } = require('../controllers/hotelController');

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Get all hotels
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   rooms:
 *                     type: number
 *                   amenities:
 *                     type: array
 *                     items:
 *                       type: string
 *                   descripcion:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 */
router.get('/', getHotels);

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Create a new hotel
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               rooms:
 *                 type: number
 *               amenities:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *                 enum: ['playa', 'montaña', 'finca', 'ciudad', 'pueblo']
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 rooms:
 *                   type: number
 *                 amenities:
 *                   type: array
 *                   items:
 *                     type: string
 *                 descripcion:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image:
 *                   type: string
 *                 category:
 *                   type: string
 */
router.post('/', upload.single('image'), createHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Update an existing hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               rooms:
 *                 type: integer
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               descripcion:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: ['playa', 'montaña', 'finca', 'ciudad', 'pueblo']
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID'),
        body('name').optional().notEmpty().withMessage('Name is required'),
        body('location').optional().notEmpty().withMessage('Location is required'),
        body('rooms').optional().isInt({ min: 1 }).withMessage('Rooms must be a positive integer'),
        body('amenities').optional().isArray().withMessage('Amenities must be an array'),
        body('descripcion').optional().notEmpty().withMessage('Descripcion is required'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('category').optional().isIn(['playa', 'montaña', 'finca', 'ciudad', 'pueblo']).withMessage('Invalid category'),
    ],
    updateHotel
);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hotel ID
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid ID')], deleteHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Get a hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hotel ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 rooms:
 *                   type: number
 *                 amenities:
 *                   type: array
 *                   items:
 *                     type: string
 *                 descripcion:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image:
 *                   type: string
 */
router.get('/:id', getHotelById);

module.exports = router;