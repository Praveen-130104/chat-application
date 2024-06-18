import React, { useEffect } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";


const Modal = ({showModal,hideModal}) => {

   

    return (
    <>
      
      {showModal ? (
        <>
          <div className=" flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg p-4 shadow-lg relative flex flex-col w-full bg-yellow-200 outline-none focus:outline-none">
                    <MdClose className='text-2xl cursor-pointer' onClick={hideModal}/>
                <div>
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-2xl font-semibold" >
                        Upload Image
                        </h3>
                    </div>
                    <div className='flex justify-center items-center p-5'>
                        <label htmlFor="file" className='flex justify-center items-center cursor-pointer'>
                        <MdDriveFolderUpload className='text-4xl' />
                        <p className='text-xl'>Choose Image</p>
                        </label>
                    </div>
                    <div className='flex justify-center items-center p-5'>
                        <button className=' bg-green-400 px-4 py-2 rounded-lg text-white'>Upload</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;