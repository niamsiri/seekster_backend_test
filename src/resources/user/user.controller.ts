import { Router, Request, Response, NextFunction } from 'express';

import UserModel from "./user.model";

import { sign } from "jsonwebtoken";

export default class UserController {

    public router = Router();

    constructor() {
        this.router.post(`/register`, this.register)
        this.router.post(`/signin`, this.signin)
    }

    private async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let { username, fullName, password } = req.body
            let result = await UserModel.create({ username, fullName, password })
            let token = sign({ id: result._id, }, "seekter_test");
            res.status(201).json({ accessToken: token });
        } catch (error) {
            next({ status: 400, message: error });
        }
    }

    private async signin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let { username, password } = req.body
            let result = await UserModel.findOne({ username, password })
            if (result) {
                let token = sign({ id: result._id, }, "seekter_test");
                res.status(201).json({ accessToken: token });
            } else {
                res.status(400).json({
                    "name": "BadRequestError",
                    "message": "Username or password incorrect",
                    "details": null,
                    "code": 400
                });
            }
        } catch (error) {
            next({ status: 400, message: error });
        }
    }
}