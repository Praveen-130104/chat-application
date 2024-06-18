import { db } from "../firebase.config.js";
import { collection, addDoc  } from "firebase/firestore";
import bcrypt from "bcrypt";


const userAlreadyAvailable = async (email , username) => {
    try{
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = query(usersCollectionRef, where('username', '==', username));;
    const querySnapshot1 = query(usersCollectionRef, where('email', '==', email));;

    return !querySnapshot.empty || !querySnapshot1.empty;
    }catch(error){
        return error;
    }

}


export const SignUp = async (req, res) => {

    const { username, email, password } = req.body;
    
    try {
        const usersCollectionRef = collection(db, "users");
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // if(await userAlreadyAvailable(email , username)){
        //     return res.status(400).json({message :"User already exists"});
        // }
        await addDoc(usersCollectionRef, {
            username: username,
            email: email,
            password: hashedPassword,
            image : "https://res.cloudinary.com/djdhjstoc/image/upload/v1706020747/836-removebg-preview_bcj2to.png",
            friends : [],
            requests : [],
            sentRequests : [],
            chats : {},

        });
        return res.status(200).json({message :"User created successfully"});
    } catch (error) {
        return res.status(500).json({message : error});
    }

}