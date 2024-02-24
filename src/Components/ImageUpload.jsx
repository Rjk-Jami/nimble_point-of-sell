import React, { useContext, useState } from "react";
import { AiFillCamera, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import "react-image-upload/dist/index.css";
import ImageUploader from "react-image-upload";
import { GlobalVariableContext } from "../Provider/GlobalVariableProvider";

const API_KEY = "f456c6857e817f7b03c4f80d77fce11f"; // Replace with your actual API key

const ImageUpload = () => {
    const { imageUrl, setImageUrl } = useContext(GlobalVariableContext)
    const [error, setError] = useState(null);

    function handleImageUpload(imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile.file);

        axios({
            method: 'post',
            url: `https://api.imgbb.com/1/upload?expiration=0&key=${API_KEY}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                // console.log("Image uploaded successfully:", response.data.data.url);
                setImageUrl(response.data.data.url);
                setError(null);
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                setError("Error uploading image. Please try again.");
                setImageUrl(null);
            });
    }
    const handleImageDelete =()=>{
        setImageUrl("")
    }


    return (
        <div>
            <h4></h4>
            <div className="w-full">
                <ImageUploader 
                onFileRemoved={handleImageDelete}
                style={{ height: 200, width: 250, background: 'rgb(254 226 226)' }}
                    onFileAdded={(img) => handleImageUpload(img)}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                
            </div>
        </div>
    );
}

export default ImageUpload;
