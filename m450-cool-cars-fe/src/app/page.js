"use client"

import {useState} from "react";
import CarForm from "@/app/carform/page";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  const [cars, setCars] = useState([])

  function buttonHandler() {
    fetch("http://localhost:8080/cars")
        .then(response => response.json())
        .then(data => setCars(data))
  }

  function sortCars(order) {
    const sortedCars = [...cars].sort((a, b) => {
      if (order === "ascending") {
        return a.brand.localeCompare(b.brand);
      } else {
        return b.brand.localeCompare(a.brand);
      }
    });

    setCars(sortedCars);
  }

  function onChange(event) {
    const selectedValue = event.target.value;
    sortCars(selectedValue);
  }

  return (
      <div className="App">
        <h1>My Frontend - The very beginning</h1>
        <button onClick={buttonHandler}>load cars</button>
        <select onChange={onChange} className={"margin"}>
          <option value="ascending">Alphabetic ascending</option>
          <option value="descending">Alphabetic descending</option>
        </select>
        <br/>
        <ul>
          {cars.map(car => (
              <li key={car.id}>
                {car.brand + " " + car.model + " (" + car.horsePower + ")"}
              </li>
          ))}
        </ul>
        <Link href="/carform">add a new car</Link>
      </div>
  );
}
