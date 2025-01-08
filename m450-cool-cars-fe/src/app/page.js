"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import "./globals.css";

function filterCars(cars, searchTerm) {
    return cars.filter(
        (car) =>
            car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function sortCars(cars, sortCategory, isAscending) {
    const order = isAscending ? 1 : -1;
    return [...cars].sort((a, b) => {
        if (sortCategory === "alphabet") {
            return order * a.brand.localeCompare(b.brand);
        } else if (sortCategory === "horsepower") {
            return order * (a.horsePower - b.horsePower);
        }
        return 0;
    });
}

export default function Home() {
    const [cars, setCars] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const [sortCategory, setSortCategory] = useState("alphabet");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    async function fetchCars() {
        const response = await fetch("http://localhost:8080/cars");
        const data = await response.json();
        setCars(data);
    }

    const processedCars = useMemo(() => {
        let result = filterCars(cars, searchTerm);
        return sortCars(result, sortCategory, isAscending);
    }, [cars, searchTerm, sortCategory, isAscending]);

    const currentCars = useMemo(() => {
        const indexOfLastCar = currentPage * itemsPerPage;
        const indexOfFirstCar = indexOfLastCar - itemsPerPage;
        return processedCars.slice(indexOfFirstCar, indexOfLastCar);
    }, [processedCars, currentPage, itemsPerPage]);

    const nextPage = () => {
        if (currentPage < Math.ceil(processedCars.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const arrowup = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="25"
            height="25"
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
            width="25"
            height="25"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
        </svg>
    );

    return (
        <div className="App">
            <h1>My Frontend - The very beginning</h1>
            <div className="container">
                <button onClick={fetchCars}>Load Cars</button>
                <select
                    onChange={(e) => setSortCategory(e.target.value)}
                    className="margin"
                >
                    <option value="alphabet">Alphabetic</option>
                    <option value="horsepower">Horsepower</option>
                </select>
                <button onClick={() => setIsAscending(!isAscending)} className="margin">
                    {isAscending ? arrowdown : arrowup}
                </button>
            </div>

            <input
                type="text"
                placeholder="Search cars..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <br />
            <ul>
                {currentCars.map((car) => (
                    <li key={car.id}>
                        {car.brand + " " + car.model + " (" + car.horsePower + ")"}
                    </li>
                ))}
            </ul>

            <br />

            <Link href="/carform">Add a new car</Link>

            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className={"margin"}>Page {currentPage}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= Math.ceil(processedCars.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
