import { Express, NextFunction, Request, Response } from "express";

function routes(app: Express){
    app.get("/healthcheck", (req: Request, res: Response, next: NextFunction)=> {
        res.sendStatus(200)
    })
}

export default routes