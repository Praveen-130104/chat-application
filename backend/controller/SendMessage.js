import { db } from "../firebase.config.js";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const SendMessage = async (req, res) => {
    const { username, friend, message, collectionId } = req.body;
    try {
        const chatRef = doc(db, "messages", collectionId);

        // Fetch the existing document data
        const chatSnapshot = await getDoc(chatRef);
        const existingMessages = chatSnapshot.data()?.messages || [];

        const newMessage = {
            sender: username,
            message: message,
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
