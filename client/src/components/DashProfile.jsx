import { Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const[imageFileUploadProgess, setImageFileUploadingProgess] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    console.log(imageFileUploadProgess);
    console.log(imageFileUploadError)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);

    const uploadImage = async() => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadingProgess(progress.toFixed(0));
        },
        (error) => {
            setImageFileUploadError('could not upload image(File must be less than 2MB)')
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
            })
        }
        )
    }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4">
            <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
            <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
            <img src={imageFileUrl || currentUser.profilePicture} alt="user" className="rounded-full w-full border-8 h-full object-cover border-[lightgray]" />
            </div>
            <TextInput type="text" id='username' placeholder="username" defaultValue={currentUser.username} />
            <TextInput type="email" id='email' placeholder="email" defaultValue={currentUser.email} />
            <TextInput type="password" id='password' placeholder="password" />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
        </div>
    </div>
  )
}
