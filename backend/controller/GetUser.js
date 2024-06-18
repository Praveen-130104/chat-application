import {db} from "../firebase.config.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export const GetUser = async (req, res) => {
    const { username,friend } = req.body;
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('username', '==', username));
        // console.log(q);
        const userSnapshot = await getDocs(q);
        
        if (userSnapshot.empty) {
            return null; // User not found
        }

        // Assuming each username is unique, so there should be at most one document in the snapshot
        const userData = userSnapshot.docs[0].data();
        const user = {
            id: userSnapshot.docs[0].id,
            email: userData.email,
            username: userData.username,
            status: userData.status,
            image: userData.image,
            chats: userData.chats[friend],
        };


        return res.status(200).json({ user: user });
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(400).json({ message: error });
    }
}   