"use client";
import { useState } from "react";

export default function CarForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        fetch("http://localhost:8080/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIsSubmitted(true);
            })
            .catch((error) => console.error("Error:", error));
    }

    if (isSubmitted) {
        window.location.href = "/";
    }


    return (
        <div>
            <h1>Car Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Brand:
                    <input type="text" name="brand" />
                </label>
                <br />
                <label>
                    Model:
                    <input type="text" name="model" />
                </label>
                <br />
                <label>
                    Horsepower:
                    <input type="number" name="horsePower" min={0}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
