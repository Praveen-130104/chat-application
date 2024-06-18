import dotenv from "dotenv";
import { doc, updateDoc  } from "firebase/firestore";
import { storage } from '../firebase.config.js';
import { ref , deleteObject } from 'firebase/storage';
import { db } from "../firebase.config.js";
import { collection, query, where, getDocs } from "firebase/firestore";

dotenv.config();



export const RemoveImage = async (req, res) => {
    const {id , username} = req.body;
    const imgUrl = "https://res.cloudinary.com/djdhjstoc/image/upload/v1706020747/836-removebg-preview_bcj2to.png";

    try {
       
        const docRef = doc(db, 'users', id);
        await updateDoc(docRef, {
            image: imgUrl,
        });

        //delete the image in the folder "profiles/username"
        const storageRef = ref(storage, `profiles/${username}`);
        await deleteObject(storageRef);

        // const user = await findUser(username);

        return res.status(200).json({ message: "Image removed successfully" , imgUrl : imgUrl});

    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


}