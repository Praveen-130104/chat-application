import React, { Suspense, useEffect, useState } from 'react'
import axios from 'axios';
import { MdEdit, MdClose, MdDriveFolderUpload, MdDelete } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import Menu from './Menu';


const Profile = () => {

  const [image, setImage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [upload, setUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);


  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");



  const uploadImage = async () => {

    if (!imageUpload) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("username", user.username);
      formData.append("image", imageUpload);

      const response = await axios.post("http://localhost:3000/api/protected/uploadImage", formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      if (response.status === 200) {

        setImageUpload(null);
        setUploaded(true);
        alert("Image Uploaded");
      } else {
        alert("Image Upload Failed");
      }
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
  };

  const removeImage = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/protected/removeImage", {
        id: user.id,
        username: user.username,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data.imgUrl);

      if (response.status === 200) {
        setImage(response.data.imgUrl);
        alert("Image Removed");

      } else {
        alert("Image Remove Failed");
      }
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);

  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const response = axios.post("http://localhost:3000/api/protected/logout", {
          id: user.id,
        }
          , {
            headers: {
              Authorization: `${token}`,
            },
          }).then((response) => {
            if (response.status === 200) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            } else {
              alert("Logout Failed");
            }
          }).catch((err) => {
            console.log(err);
          });
  }




  useEffect(() => {
    if (user && image === "") {
      setImage(user.image);
    }
  }, [user, uploaded]);





  return (
    <div className='w-full   lg:h-screen p-4  rounded rounded-r-3xl'>

      {/* image  */}

      <div className='my-7 h-[7rem] md:h-[8rem] lg:h-[9rem] flex flex-col items-center justify-center'>
        <div className=' relative w-[28%] md:w-[18%] lg:w-3/5 h-full'>
          <Suspense fallback={<div>Loading...</div>}>
            <img src={image} alt="profile" className='w-full h-full rounded-full object-cover' width={100} height={100} />
          </Suspense>
          <div className='absolute bottom-4 right-0 rounded-full bg-red-200 p-1 cursor-pointer ' onClick={() => setShowModal(true)}>
            <MdEdit className='text-2xl  ' />
          </div>
        </div>
        <div className=' mt-3'>
          <h2 className=' text-md md:text-xl font-semibold uppercase cursor-default'>{user.username}</h2>
        </div>
      </div>

      <div className='bg-rd-300 my-20 h-2/4 flex items-start  justify-center'>
        <Menu />
      </div>



      <div className='grid grid-cols-3  cursor-pointer' onClick={logout}
      >
        <i className='cols-span-1 flex items-center justify-center'>
          <IoLogOutOutline className='text-2xl' />
        </i>
        <p className='cols-span-2 text-md font-bold tracking-wide  '>Logout</p>
      </div>






      {/* Modal */}
      <>

        {showModal ? (
          <>
            <div className=" flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-5 md:inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-3 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg p-4 shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                  <div className="relative  flex justify-center items-center my-4">
                    <h3 className="text-2xl font-semibold" >
                      Upload Image
                    </h3>
                    <MdClose className=' absolute top-0 right-2 text-2xl cursor-pointer' onClick={() => setShowModal(false)} />
                  </div>
                  <div className='flex justify-center items-center'>
                    <input
                      type="file"
                      id="file"
                      accept='.jpg,.png,.jpeg'
                      onChange={(e) => {
                        setImageUpload(e.target.files[0])
                        setUpload(true);
                      }}
                      className="hidden"
                    />
                    <div className=' border-2 border-black rounded-lg  p-3 m-1 '  >
                      {upload ? (
                        <button className='bg-green-400 px-4 py-2 rounded-lg text-white' onClick={uploadImage}>Upload</button>
                      ) : (
                        <label htmlFor="file" className='flex justify-center items-center cursor-pointer'>
                          <MdDriveFolderUpload className='text-4xl ' />
                          <p className='px-2'>Upload Image</p>
                        </label>
                      )
                      }
                    </div>
                    <div className='flex  justify-around items-center border-2 border-black rounded-lg  p-3 m-1 cursor-pointer' onClick={removeImage}>
                      <MdDelete className='text-4xl' />
                      <p className='px-2'>Remove Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>


    </div>
  )
}

export default Profile