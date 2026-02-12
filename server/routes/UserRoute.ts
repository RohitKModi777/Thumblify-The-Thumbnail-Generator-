import express from "express"
import { generateThumbnailbyId, getUserThumbnails } from "../controllers/UserController.js";
import protect from "../middleware/auth.js";

const UserRouter = express.Router();

UserRouter.get("/thumbnails",protect,getUserThumbnails)
UserRouter.get("/thumbnails/:id",protect, generateThumbnailbyId)

export default UserRouter