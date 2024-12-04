"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const [sortCategory, setSortCategory] = useState("alphabet");

    function buttonHandler() {
        fetch("http://localhost:8080/cars")
            .then((response) => response.json())
            .then((data) => setCars(data));
    }

    const arrowup = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="36"
            height="36"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
        </svg>
    );

    const arrowdown = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="36"
            height="36"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
        </svg>
    );

    function sortCars() {
        const order = isAscending ? "ascending" : "descending";
        const sortedCars = [...cars].sort((a, b) => {
            if (sortCategory === "alphabet") {
                return order === "ascending"
                    ? a.brand.localeCompare(b.brand)
                    : b.brand.localeCompare(a.brand);
            } else if (sortCategory === "horsepower") {
                return order === "ascending"
                    ? a.horsePower - b.horsePower
                    : b.horsePower - a.horsePower;
            }
        });

        setCars(sortedCars);
    }

    function toggleSortOrder() {
        setIsAscending(!isAscending);
        sortCars();
    }

    function handleCategoryChange(event) {
        setSortCategory(event.target.value);
        sortCars();
    }

    return (
        <div className="App">
            <h1>My Frontend - The very beginning</h1>
            <button onClick={buttonHandler}>load cars</button>
            <select onChange={handleCategoryChange} className="margin">
                <option value="alphabet">Alphabetic</option>
                <option value="horsepower">Horsepower</option>
            </select>
            <br />
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        {car.brand + " " + car.model + " (" + car.horsePower + ")"}
                    </li>
                ))}
            </ul>

            <button onClick={toggleSortOrder} className="margin">
                {isAscending ? arrowup : arrowdown}
            </button>

            <br />

            <Link href="/carform">add a new car</Link>
        </div>
    );
}
