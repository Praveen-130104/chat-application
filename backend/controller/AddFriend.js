import {db} from "../firebase.config.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, updateDoc  } from "firebase/firestore";


async function findUser(username) {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('username', '==', username));
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
            password: userData.password,
            image: userData.image,
            friends: userData.friends,
            requests: userData.requests,
            sentRequests: userData.sentRequests,
            chats: userData.chats,
        };

        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

export const AddFriend = async (req, res) => {
    const { username, friend } = req.body;
    try {
        
        const sender = await findUser(username);
        const receiver = await findUser(friend);
        if(!sender){
            return res.status(400).json({ message: "User not found" });
        }
        if(!receiver){
            return res.status(400).json({ message: "User not found" });
        }
        
        if(sender.sentRequests.includes(friend)){
            return res.status(400).json({ message: "Request already sent" });
        }
        if(sender.friends.includes(friend)){
            return res.status(400).json({ message: "Already friends" });
        }
        
        // console.log("id->",doc(db, 'users', sender.id));
        const senderDocRef = doc(db, 'users', sender.id);

        const receiverDocRef = doc(db, 'users', receiver.id);

        await updateDoc(receiverDocRef, {
            requests: [...receiver.requests, username],
        });

        await updateDoc(senderDocRef, {
            sentRequests: [...sender.sentRequests, friend],
        });

        return res.status(200).json({ message: "Friend request sent successfully" });

    } catch (error) {
        return res.status(500).json({ message: error });
    }



};