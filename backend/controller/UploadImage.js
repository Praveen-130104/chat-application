import { db } from '../firebase.config.js'
import { storage } from '../firebase.config.js'
import {ref , uploadBytes  , getDownloadURL} from 'firebase/storage'
import { doc, updateDoc  } from "firebase/firestore";



export const UploadImage = async(req,res) => {
    try{
        const {id , username } = req.body;
        const image = req.file;
        //get the user using the id

       const storageRef = ref(storage, `profiles/${username}`);
       await uploadBytes(storageRef, image.buffer ,{
           contentType : 'image/jpeg , image/png , image/jpg' ,
        });
        const imgUrl = await getDownloadURL(storageRef);

        //update the user with the image url
        await updateDoc(doc(db, "users", id), {
            image : imgUrl,
        });

        return res.status(200).json({message : "Image uploaded successfully" , imgUrl : imgUrl});

    } catch(error){
        return res.status(500).json({message : error});
    }
}
