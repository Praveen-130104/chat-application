import {db} from "../firebase.config.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
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

export const AcceptFriend = async (req, res) => {
    const { username, friend } = req.body;
    try{
        const accepter = await findUser(username);
        const requester = await findUser(friend);

        if(!requester){
            return res.status(400).json({message : "User not found"});
        }

        if(!accepter.requests.includes(friend)){
            return res.status(400).json({message : "Request not found"});
        }

        const accepterDocRef = doc(db, 'users', accepter.id);
        const requesterDocRef = doc(db, 'users', requester.id);

        const collectionRef = collection(db, 'messages');

        const chatRef = await addDoc(collectionRef, {
            sendname: accepter.username,
            recname: requester.username,
            messages: [] ,
        })


        accepter.chats = {
            ...accepter.chats,
            [requester.username]: chatRef.id,
          };
          

        requester.chats = {
            ...requester.chats,
            [accepter.username]: chatRef.id,
        };
        
        await updateDoc(accepterDocRef, {
            requests : accepter.requests.filter((req) => req !== friend),
            friends : [...accepter.friends, friend],
            chats : {...accepter.chats },
            
        });

        await updateDoc(requesterDocRef, {
            sentRequests : requester.sentRequests.filter((req) => req !== username),
            friends : [...requester.friends, username],
            chats : {...requester.chats },
        });





        return res.status(200).json({message : "Friend added successfully"});

    } catch(error){
        console.log(error)
        return res.status(500).json({message : error});
    }
}