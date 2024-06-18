import { db } from "../firebase.config.js";
import {doc , getDoc} from 'firebase/firestore'

export const DisplayChats = async (req, res) => {
    const { collectionId } = req.body;
    try{

        const chatRef = doc(db, "messages", collectionId);
        const chatSnap = await getDoc(chatRef);
        const chatData = chatSnap.data();
        const messages = chatData.messages;
        return res.status(200).json({messages : messages});

    } catch(error){
        console.log(error);
        return res.status(500).json({message : error});
    }
}