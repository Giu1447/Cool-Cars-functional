"use client";
import { useState } from "react";

async function submitCar(data) {
    try {
        const response = await fetch("http://localhost:8080/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export default function CarForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            await submitCar(data);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to submit car:", error);
        }
    };

    if (isSubmitted) {
        return (
            <div>
                <h1>Thank you!</h1>
                <p>Your car has been successfully added.</p>
                <button onClick={() => (window.location.href = "/")}>Go Home</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Car Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Brand:
                    <input type="text" name="brand" required />
                </label>
                <br />
                <label>
                    Model:
                    <input type="text" name="model" required />
                </label>
                <br />
                <label>
                    Horsepower:
                    <input type="number" name="horsePower" min={0} required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
