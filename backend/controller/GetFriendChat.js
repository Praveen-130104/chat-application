import { db } from "../firebase.config.js";
import { collection } from "firebase/firestore";
import { doc , getDoc} from 'firebase/firestore'



export const GetFriendChat = async (req, res) => {
    const { collectionId } = req.body;
    try {
        // console.log(collectionId);
        const chatRef = doc(db, "messages", collectionId);
        const chatSnap = await getDoc(chatRef);
        const chatData = chatSnap.data();
        const messages = chatData.messages;
        
        // const last = messages;
        // console.log(last);

        const lastmessage = messages[messages.length-1];

        // console.log(lastmessage);

        return res.status(200).json({ lastmessage: lastmessage });
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(400).json({ message: error });
    }

}