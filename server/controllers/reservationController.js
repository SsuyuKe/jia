import asyncHandler from 'express-async-handler';
import Reservation from '../models/reservation.js';
import User from '../models/user.js';

const reservationController = {
    createReservation: asyncHandler(async (req, res) => {
        const { name, date, time, people, tableNo, phone, email } = req.body;
        const userId = req.user?._id;  

        try {
            const existingReservation = await Reservation.findOne({
                date: new Date(date),
                time,
                tableNo,
                status: { $ne: 'cancelled' }
            });

            if (existingReservation) {
                res.status(400);
                throw new Error('此座位已被預訂');
            }

            const reservation = await Reservation.create({
                name,
                date,
                time,
                people,
                tableNo,
                phone,
                email,
                user: userId,
                status: 'pending'
            });

            if (userId) {
                await User.findByIdAndUpdate(userId, {
                    $push: {
                        reservations: {
                            reservationId: reservation._id,
                            date: reservation.date,
                            time: reservation.time,
                            people: reservation.people,
                            tableNo: reservation.tableNo,
                            status: reservation.status
                        }
                    }
                });
            }

            res.status(201).json(reservation);
        } catch (error) {
            res.status(400);
            throw new Error(error.message || '建立訂位失敗');
        }
    }),

    checkTableAvailability: asyncHandler(async (req, res) => {
        const { date, time, tableNo } = req.query;

        try {
            const existingReservation = await Reservation.findOne({
                date: new Date(date),
                time,
                tableNo,
                status: { $ne: 'cancelled' }  
            });

            res.json({
                available: !existingReservation,
                message: existingReservation ? '此座位已被預訂' : '座位可用'
            });
        } catch (error) {
            res.status(500);
            throw new Error('檢查座位狀態失敗');
        }
    }),

    getUserReservations: asyncHandler(async (req, res) => {
        try {
            const reservations = await Reservation.find({
                user: req.user._id,
                status: { $ne: 'cancelled' } 
            }).sort('-date');

            res.json(reservations);
        } catch (error) {
            res.status(400);
            throw new Error('獲取訂位記錄失敗');
        }
    }),

    getAllReservations: asyncHandler(async (req, res) => {
        const reservations = await Reservation.find({})
            .populate('user', 'username')
            .sort('-date');
        res.json(reservations);
    }),

    updateReservation: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            res.status(404);
            throw new Error('找不到訂位資料');
        }

        reservation.status = status;
        const updatedReservation = await reservation.save();

        if (reservation.user) {
            await User.updateOne(
                {
                    _id: reservation.user,
                    'reservations.reservationId': reservation._id
                },
                {
                    $set: {
                        'reservations.$.status': status
                    }
                }
            );
        }

        res.json(updatedReservation);
    })
};

export default reservationController;