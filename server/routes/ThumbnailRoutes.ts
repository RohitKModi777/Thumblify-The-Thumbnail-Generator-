import express, { Request, Response, NextFunction } from "express"
import { generateThumbnail, deleteThumbnail } from "../controllers/ThumbnailController.js";
import protect from "../middleware/auth.js";


const ThumbnailRouter = express.Router();

ThumbnailRouter.post('/generate', protect, generateThumbnail)
ThumbnailRouter.delete('/delete/:id', protect, deleteThumbnail)


export default ThumbnailRouter