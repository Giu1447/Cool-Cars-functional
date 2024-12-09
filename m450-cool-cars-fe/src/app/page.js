"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./globals.css";


export default function Home() {
    const [cars, setCars] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const [sortCategory, setSortCategory] = useState("alphabet");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    // Berechne den Indexbereich basierend auf der aktuellen Seite
    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

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

    function onChange(event) {
        const selectedValue = event.target.value;
        sortCars(selectedValue);
    }

    let debounceTimeout;
    function handleSearch(value) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            setSearchTerm(value);
        }, 0);
    }

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredCars.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="App">
            <h1>My Frontend - The very beginning</h1>
            <div className="container">
                <button onClick={buttonHandler}>load cars</button>
                <select onChange={handleCategoryChange} className="margin">
                    <option value="alphabet">Alphabetic</option>
                    <option value="horsepower">Horsepower</option>
                </select>
                <button onClick={toggleSortOrder} className="margin">
                    {isAscending ? arrowdown : arrowup}
                </button>
            </div>


            <input
                type="text"
                placeholder="Search cars..."
                onChange={(e) => handleSearch(e.target.value)}
                className="search-bar"
            />
            <br/>
            <ul>
                {currentCars.map((car) => (
                    <li key={car.id}>
                        {car.brand + " " + car.model + " (" + car.horsePower + ")"}
                    </li>
                ))}
            </ul>


            <br/>

            <Link href="/carform">add a new car</Link>

            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= Math.ceil(filteredCars.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
