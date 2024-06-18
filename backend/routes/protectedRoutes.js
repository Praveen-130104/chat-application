import express from "express";
import { UploadImage } from "../controller/UploadImage.js";
import { RemoveImage } from "../controller/removeImage.js";
import { AddFriend } from "../controller/AddFriend.js";
import { AcceptFriend } from "../controller/AcceptFriend.js";
import { GetUser } from "../controller/getUser.js";
import { SendMessage } from "../controller/SendMessage.js";
import { DisplayChats } from "../controller/DisplayChats.js";
import { GetFriendChat } from "../controller/getFriendChat.js";
import { SendImgMsg } from "../controller/SendImgMsg.js";
import { Logout } from "../controller/Logout.js";
import { SearchFriend } from "../controller/SearchFriend.js";
import multer from "multer";

const upload = multer();

const protectedRouter = express.Router();

protectedRouter.post("/uploadImage", upload.single("image") , UploadImage);
protectedRouter.post("/removeImage", RemoveImage);
protectedRouter.post("/addFriend", AddFriend);
protectedRouter.post("/acceptFriend", AcceptFriend);
protectedRouter.post("/getUser", GetUser);
protectedRouter.post("/sendMessage", SendMessage);
protectedRouter.post("/displayChats", DisplayChats);
protectedRouter.post("/getFriendChat", GetFriendChat);
protectedRouter.post("/sendImgMsg", upload.single("image"),SendImgMsg);
protectedRouter.post("/searchFriend", SearchFriend);
protectedRouter.post("/logout", Logout);


export default protectedRouter;