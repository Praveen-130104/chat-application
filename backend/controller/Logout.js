import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config.js';


export const Logout = async (req, res) => {
    try {
        const userId = req.userId;
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            status: "offline",
        });
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}