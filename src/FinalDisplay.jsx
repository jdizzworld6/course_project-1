import React, { useState } from "react";
import PickerPage from "./PickerPage";
import "./FinalDisplay.css"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


export default function FinalDisplay() {
    const [displayData, setDisplayData] = useState([]);

    const [countItems, setCountItems] = useState([
        { type: "Jacket", count: 0 },
        { type: "Shirt", count: 0 },
        { type: "Tie", count: 0 },
        { type: "Shoes", count: 0 },
        { type: "Final Display Selected", count: 0 }
    ])

    const handleCount = (changed) => {
        setCountItems((prevCountItems) =>
            prevCountItems.map((item) =>
                item.type === changed ? { ...item, count: item.count + 1 } : item
            )
        );
    }

    const removeCount = (changed) => {
        setCountItems((prevCountItems) =>
            prevCountItems.map((item) =>
                item.type === changed ? { ...item, count: item.count - 1 } : item
            )
        );
    }

    const updateFinalCount = () => {
        setCountItems((prevCountItems) =>
            prevCountItems.map((item) =>
                item.type === "Final Display Selected" ? { ...item, count: item.count + 1 } : item
            )
        );
    }

    // add or updates final display
    const handleDisplayDataChange = (newData) => {
        const changeData = newData[0]
        const addData = displayData.some((image) => (
            image.id === changeData.id
        ))
        // updates final display
        if (addData) {
            setDisplayData((prevImageData) =>
                prevImageData.map((image) =>
                    image.id === changeData.id ? { ...image, note: changeData.note } : image)
            );

            // adds to final display
        } else {
            setDisplayData([...displayData, changeData]);
        }

    };
    // Clears photos
    const clearPhotos = () => {
        setDisplayData([]);
        setCountItems((prevCountItems) =>
            prevCountItems.map((item) =>
                item.type === "Final Display Selected" ? { ...item, count: 0 } : item
            )
        );
    }

    return <>


        <div>
            <div className="container">
                <div className="item-1">
                    <BarChart id="barchart" width={730} height={250} data={countItems}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar id="mybar" dataKey="count" fill="#8884d8" />
                    </BarChart>
                </div>
                <div className="item-2">
                    <img id="titleImage" src="public\images\titleImage.png"></img>
                </div>
            </div>
        </div>
        <div className="grid-container">

            <div className="content">
                <PickerPage suiteCategory={"Jacket"} onDataChange={handleDisplayDataChange} onUploadItem={handleCount} onDeleteItem={removeCount} onCountFinal={updateFinalCount} />

                <PickerPage suiteCategory={"Shirt"} onDataChange={handleDisplayDataChange} onUploadItem={handleCount} onDeleteItem={removeCount} onCountFinal={updateFinalCount} />

                <PickerPage suiteCategory={"Tie"} onDataChange={handleDisplayDataChange} onUploadItem={handleCount} onDeleteItem={removeCount} onCountFinal={updateFinalCount} />

                <PickerPage suiteCategory={"Shoes"} onDataChange={handleDisplayDataChange} onUploadItem={handleCount} onDeleteItem={removeCount} onCountFinal={updateFinalCount} />
            </div>

            <div className="right-nav">
                <h2 id="title">Final Display</h2>
                {displayData.map((image) =>
                    <div className='img' key={image.id}>
                        <img className='imgMain' src={image.url}></img>
                        <h3>{image.note}</h3>
                    </div>
                )}
                <button id="clear" onClick={clearPhotos}>Clear</button>
            </div>

        </div>

    </>
}
