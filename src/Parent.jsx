import "./Parent.css"
import React, { useState, useRef } from "react"

export default function Parent() {
    const [myText, setMyText] = useState(["the", "a", "it"])
    const [myValue, setMyValue] = useState("")
    const myTextField = useRef(null)

    const handleSetText = () => {
        const myValue = myTextField.current.value
        setMyText([...myText, myValue])
    }

    const updateValue = (value, index) => {
        setMyValue(values =>
            Object.assign([], values, {[index]: value})
        );
    };

    const handleChangeText = (indx) => {
        const myChangeValue = myValue[1];

        const newArray = myText.map((item, index) => {
             if (index == indx) {
                 return myChangeValue
             } else {
                 return item
             }
         })

        setMyText(newArray)

    }

    return <>

        <input
            type="text"
            ref={myTextField}
            placeholder="type something here"
        />
        <button onClick={handleSetText}>Submit</button>

        <ul>
            {myText.map((text, index) => (
                <li key={index}>{text}
                    <button onClick={() => handleChangeText(index)}>change</button>
                    <input
                        type="text"
                        onChange={evt => updateValue(evt.target.value, index)}
                    />

                </li>
            ))}
        </ul>


    </>
}