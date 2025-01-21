const express = require('express');
const router = express.Router();
const { getReservations, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
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
 *                   hotel:
 *                     type: string
 *                   room:
 *                     type: string
 *                   user:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                     format: date
 *                   checkOut:
 *                     type: string
 *                     format: date
 *                   guests:
 *                     type: number
 */
router.get('/', getReservations);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *               room:
 *                 type: string
 *               user:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               guests:
 *                 type: number
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
 *                 hotel:
 *                   type: string
 *                 room:
 *                   type: string
 *                 user:
 *                   type: string
 *                 checkIn:
 *                   type: string
 *                   format: date
 *                 checkOut:
 *                   type: string
 *                   format: date
 *                 guests:
 *                   type: number
 */
router.post('/', createReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *               room:
 *                 type: string
 *               user:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               guests:
 *                 type: number
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
 *                 hotel:
 *                   type: string
 *                 room:
 *                   type: string
 *                 user:
 *                   type: string
 *                 checkIn:
 *                   type: string
 *                   format: date
 *                 checkOut:
 *                   type: string
 *                   format: date
 *                 guests:
 *                   type: number
 */
router.put('/:id', updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', deleteReservation);

module.exports = router;