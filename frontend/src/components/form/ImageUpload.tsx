import React, { useEffect, useRef, useState } from 'react'
import { ImageUploadProps } from '../props/props_Form'
import Button from './Button'


const ImageUpload = ({ id, onInput } : ImageUploadProps) => {

    const [file, setFile] = useState(null);
    const [previewURL, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(Boolean);

    const filePickerRef: any = useRef();
    let fileIsValid = isValid;

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    useEffect(() => {

        if( !file) {
            return;
        }

        const fileReader: any = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    }, [file]);

    const pickedHandler = (event: any) => {
        let pickedFile: any;

        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;

        onInput(id, pickedFile, fileIsValid);
        pickedFile = null;
    }

  return (
    <div className='form_input_element'>
        <div className='form_input_element_header'>
            <label>Post Image</label>
        </div>
        <input id={id} ref={filePickerRef} style={{display: 'none'}} type='file' accept='.jpg,.png,.jpeg' onChange={(e: any) => pickedHandler(e)}/>
            <div className='form_image_preview_container'>
                { previewURL && 
                    <img src={previewURL} alt="Image previw"/>
                }
                { !previewURL &&
                    <p>Please pick an image</p>
                }
            </div>
            <Button 
                    classname='button_image_upload' 
                    classname_enabled='button_submit_enabled' 
                    classname_disabled='button_submit_disabled' 
                    type='button'
                    label='Choose an image'
                    onClick={pickImageHandler} 
                    
            />
    </div>
  )

}

export default ImageUpload