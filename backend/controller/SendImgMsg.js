import { db } from "../firebase.config.js";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { storage } from '../firebase.config.js'
import {ref , uploadBytes  , getDownloadURL} from 'firebase/storage'

export const SendImgMsg = async (req, res) => {
    const { username,friend , collectionId } = req.body;
    const image = req.file;
    try {
        const chatRef = doc(db, "messages", collectionId);

        // Fetch the existing document data
        const chatSnapshot = await getDoc(chatRef);
        const existingMessages = chatSnapshot.data()?.messages || [];

        const storageRef = ref(storage, `${username}/${friend}/${new Date().getTime()}`);
       await uploadBytes(storageRef, image.buffer ,{
           contentType : 'image/jpeg , image/png , image/jpg' ,
        });
        const imgUrl = await getDownloadURL(storageRef);


        const newMessage = {
            sender: username,
            type: "image",
            message: imgUrl,
            time: new Date(), // Use JavaScript Date object for the timestamp
        };

        // Update the document with the new messages array
        await updateDoc(chatRef, {
            messages: arrayUnion(newMessage, ...existingMessages),
        });

        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
