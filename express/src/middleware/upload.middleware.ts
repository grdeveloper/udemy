import {Express, Request} from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (request: Request, file: Express.Multer.File, cb: Function) {
        cb(null, "uploads/");
    },
    filename: function (request: Request, file: Express.Multer.File, cb: Function) {
        file && cb(null, file.originalname);
    }
});

export const upload = multer({ storage });
