import { db } from "../firebase.config.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doc, updateDoc } from "firebase/firestore";

import dotenv from "dotenv";
dotenv.config();


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
      image : userData.image,
      friends : userData.friends,
      requests : userData.requests,
      sentRequests : userData.sentRequests,
      chats : userData.chats,
    };

    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

export const Login = async (req, res) => {
    const { username, password } = req.body;
    const secretKey = process.env.SECRET_KEY;
    

    const user = await findUser(username);

    const userDetails = {
        id : user.id,
        username: user.username,
        email: user.email,
        image : user.image,
        friends : user.friends,
        requests : user.requests,
        sentRequests : user.sentRequests,
        chats : user.chats,
    }
    //update the status of the user to online
    const docRef = doc(db, 'users', user.id);
    await updateDoc(docRef, {
        status: "online",
    });

    if (user) {
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });


            res.status(200).json({ token , userDetails  });
        } else {
            res.status(401).json({ error: 'Incorrect password' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }


}