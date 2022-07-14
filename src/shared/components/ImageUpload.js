import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ErrorModal from './ErrorModal';
import styles from './ImageUpload.module.css';

function ImageUpload(props) {

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(true);
    const imagePickerRef = useRef();

    const pickImageHandler = () => {
        imagePickerRef.current.click();
    }

    const pickerHandler = event => {
        console.log(event.target.files);
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setPreviewUrl(window.URL.createObjectURL(pickedFile));
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            setPreviewUrl(null);
            fileIsValid = false;
        };
        props.onInput(event, pickedFile, isValid, 'pick image on change');
    };

    let buttonText;
    if (file) {
        buttonText = 'Change image'
    } else {
        buttonText = props.text;
    }


    return (
        <div className={`${styles.picker}`}>

            {!isValid && <ErrorModal error={'Please pick a valid file.'} onClear={() => { setIsValid(true); setPreviewUrl(null); }} />}

            <input ref={imagePickerRef} type='file' id={props.id} style={{ display: 'none' }} accept=".jpg, .png, .jpeg" onChange={pickerHandler} />

            <div>
                <div className={`${styles.image_preview}`}>
                    {previewUrl && <img src={previewUrl} className={`${styles.image}`} alt='Preview' />}
                </div>
                <button className={`${styles.button}`} type='button' onClick={pickImageHandler}>{buttonText}</button>
            </div>

        </div>
    )
}

export default ImageUpload