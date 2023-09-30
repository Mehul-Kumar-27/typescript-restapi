import { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if(!user){
        res.sendStatus(403);
    }else{
        next()
    }
}

export default requireUser;