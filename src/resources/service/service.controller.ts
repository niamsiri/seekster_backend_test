import { Router, Request, Response, NextFunction } from 'express';

import ServiceModel from "./service.model";
import BookingModel from "../booking/booking.model";
import UserModel from "../user/user.model";

import { verify, decode } from "jsonwebtoken";

export default class UserController {

    public router = Router();

    constructor() {
        this.router.get(`/`, this.getServices)
        this.router.get(`/:id`, this.getServiceById)
        // this.router.post(`/`, this.insertService)
        this.router.post(`/:id/booking`, this.bookingService)
    }

    private async insertService(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let { name, price, picture, description } = req.body
            let result = await ServiceModel.create({ name, price, picture, description })
            res.status(201).json(result);
        } catch (error) {
            next({ status: 400, message: error });
        }
    }

    private async getServices(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let result = await ServiceModel.find({})
            res.status(201).json(result);
        } catch (error) {
            next({ status: 400, message: error });
        }
    }

    private async getServiceById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let { id } = req.params
            let result = await ServiceModel.findById(id)
            res.status(201).json(result);
        } catch (error) {
            next({ status: 400, message: error });
        }
    }

    private async bookingService(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

        try {
            let token: any = String(req.headers.authorization).replace("Bearer ", "")
            let decoded: any = verify(token, 'seekter_test')
            if (decoded) {
                let { id } = req.params
                let user = await UserModel.findById(decoded.id)
                await BookingModel.create({ user: user._id, service: id })
                res.status(201).json({
                    "message": `Service was booked, your booking ID is ${id}`
                });
            } else {
                res.status(400).json({
                    "name": "NotFoundError",
                    "message": "Invalid access token!",
                    "details": null,
                    "code": 404
                });
            }
        } catch (error) {
            next({ status: 400, message: error });
        }
    }
}