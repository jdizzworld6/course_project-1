
import './PickerPage.css';
import React, { useState, useRef } from 'react';
import ShortUniqueID from 'short-unique-id';
import { getRightOfStringSlice, overloadImages } from "./imageValidation"


function PickerPage({ suiteCategory, onDataChange, onUploadItem, onDeleteItem, onCountFinal }) {

    const uid = new ShortUniqueID({ length: 10 })

    const [imageData, setImageData] = useState([])
    const [error, setError] = useState('')

    const fileUploadRef = useRef();
    const noteValue = useRef();
    const imageCategory = useRef();

    // Opens file handeler to pick photo
    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }
    // Once photo is chosen it puts it into display
    const uploadImageDisplay = () => {
        let myfile = fileUploadRef.current.files[0].name;
        const fileType = getRightOfStringSlice(myfile);
        const fileOverload = overloadImages(imageData.length);

        const imageType = imageCategory.current.value

        // Add Value to Display
        if (fileType === 'png' || fileType === 'jpeg' || fileType === 'jpg') {
            if (fileOverload === false) {
                myfile = `images\\${myfile}`;

                const newDataObject = {
                    id: uid.rnd(),
                    url: `${myfile}`,
                    note: ""
                }
                setImageData([...imageData, newDataObject])
                setError(null);

                onUploadItem(imageType);

            } else {
                const overloadError = "You Can Only Upload 8 Images At A Time."
                setError(overloadError)
            }

        } else {
            const wrongFileError = "You Must Upload a PNG or JPEG File."
            setError(wrongFileError)
        }
    }
    // Update Note in Display
    const updateValue = (idToUpdate) => {
        const newNote = noteValue.current.value;

        setImageData((prevImageData) =>
            prevImageData.map((image) =>
                image.id === idToUpdate ? { ...image, note: newNote } : image)
        );
    }

    // Delete photo
    const deletePhoto = (idToRemove) => {
        const imageType = imageCategory.current.value
        setImageData((prevImageData) =>
            prevImageData.filter((image) => image.id !== idToRemove)
        )

        onDeleteItem(imageType);
    }

    // Pick Photo
    const pickPhoto = (id) => {
        const passImage = imageData.filter((image) => image.id == id);
        onDataChange(passImage)
        onCountFinal()
    }

    return <>
        <h2>{suiteCategory}</h2>
        <div className='suiteHolder'>
            {imageData.map((image) =>
                <div className='img' key={image.id}>
                    <img className='imgMain' src={image.url}></img>
                    <div className='buttonHolder'>
                        <div className='btn1'>
                            <button
                                className="button"
                                type='submit'
                                onClick={() => pickPhoto(image.id)}
                            >Pick</button>
                            <button
                                className='deleteButton'
                                type='submit'
                                onClick={() => deletePhoto(image.id)}
                            >
                                <img className='delete' src="images/iconNature.png"></img>
                            </button>
                        </div>
                        <div className='btn2'>
                            <input
                                type='text'
                                placeholder='add note'
                                ref={noteValue}
                            />
                            <button
                                className='addNote'
                                onClick={() => updateValue(image.id)}>{image.note == "" ? '+' : "edit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <button
            type='submit'
            onClick={handleImageUpload}>Upload</button>
        <input
            type='file'
            ref={fileUploadRef}
            onChange={uploadImageDisplay}
            hidden
        />
        <input
            type='hidden'
            ref={imageCategory}
            value={suiteCategory} />
        <p>{error && `${error}`}</p>
    </>
}

export default PickerPage;


