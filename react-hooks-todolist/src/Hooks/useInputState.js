import { useState } from "react";
//Use to input into a form
export default initialVal => {
    const [value, setValue] = useState(initialVal);
    const handleChange = e => {
        setValue(e.target.value);
    };
    const reset = () => {
        setValue("")
    };
    return [value, handleChange, reset]; //returns an array
}