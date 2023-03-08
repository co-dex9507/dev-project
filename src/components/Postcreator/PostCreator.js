import { Button } from "@mui/material";
import React, { useState } from "react";
import { storage, db } from "../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LinearProgress from '@mui/joy/LinearProgress';
import './Postcreator.css';
import firebase from 'firebase/compat/app';



function PostCreator({ username }) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);



    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const storageRef = ref(storage, `files/images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed",
            (snapshot) => {
                setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
            },
            (error) => {
                alert(error.message);
            },
            () => {
                getDownloadURL(storageRef)
                    .then((imgUrl) => {
                        setImgUrl(imgUrl);
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: imgUrl,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    };

    return (

        <div className="postCreator">
            <h1>Create A Post!</h1>
            <input type="text" placeholder="caption" onChange={event => setCaption(event.target.value)}></input>
            <input type="file" onChange={handleChange}></input>
            <Button onClick={handleUpload}>Upload</Button>
            <LinearProgress determinate
                variant="outlined"
                color="neutral"
                size="sm"
                thickness={32}
                value={progress}
                sx={{
                    '--LinearProgress-radius': '10px',
                    '--LinearProgress-progressThickness': '24px',
                    boxShadow: 'sm',
                    borderColor: 'neutral.500',
                }}>
            </LinearProgress>

        </div>
    )
}

export default PostCreator;