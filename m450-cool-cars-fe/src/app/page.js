"use client";

import { useState, useEffect } from "react";
import CarForm from "@/app/carform/page";
import Link from "next/link";
import "./globals.css";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);


    function buttonHandler() {
        fetch("http://localhost:8080/cars")
            .then((response) => response.json())
            .then((data) => {
                setCars(data);
                setFilteredCars(data);
            });
    }

    function sortCars(order) {
        const sortedCars = [...filteredCars].sort((a, b) => {
            if (order === "ascending-alphabet") {
                return a.brand.localeCompare(b.brand);
            } else if (order === "descending-alphabet") {
                return b.brand.localeCompare(a.brand);
            } else if (order === "ascending-horsepower") {
                return a.horsePower - b.horsePower;
            } else if (order === "descending-horsepower") {
                return b.horsePower - a.horsePower;
            }
        });

        setFilteredCars(sortedCars);
    }

    function onChange(event) {
        const selectedValue = event.target.value;
        sortCars(selectedValue);
    }

    let debounceTimeout;
    function handleSearch(value) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            setSearchTerm(value);
        }, 300);
    }

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredCars(cars);
        } else {
            setFilteredCars(
                cars.filter(
                    (car) =>
                        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        car.model.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, cars]);

    return (
        <div className="App">
            <h1>My Frontend - The very beginning</h1>
            <button onClick={buttonHandler}>Load cars</button>
            <select onChange={onChange} className={"margin"}>
                <option value="ascending-alphabet">Alphabetic ascending</option>
                <option value="descending-alphabet">Alphabetic descending</option>
                <option value="ascending-horsepower">Horsepower ascending</option>
                <option value="descending-horsepower">Horsepower descending</option>
            </select>
            <br />
            <input
                type="text"
                placeholder="Search cars..."
                onChange={(e) => handleSearch(e.target.value)}
                className="search-bar"
            />
            <ul>
                {filteredCars.map((car) => (
                    <li key={car.id}>
                        {car.brand + " " + car.model + " (" + car.horsePower + ")"}
                    </li>
                ))}
            </ul>
            <Link href="/carform">Add a new car</Link>
        </div>
    );
}
