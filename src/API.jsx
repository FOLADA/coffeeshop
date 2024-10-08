// src/components/API.jsx

import React, { createContext, useEffect, useState, useContext } from 'react';

const API_URL = 'https://your-api-url/coffee'; // Replace with your actual API URL

// Create Coffee Context
const CoffeeContext = createContext();

// Custom hook for using coffee context
export const useCoffee = () => {
  return useContext(CoffeeContext);
};

const CoffeeProvider = ({ children }) => {
  const [coffeeList, setCoffeeList] = useState([]);
  const [coffeeName, setCoffeeName] = useState('');
  const [status, setStatus] = useState('');

  // Fetch coffee data from API
  const fetchCoffees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch coffee data');
      }
      const data = await response.json();
      setCoffeeList(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new coffee
  const addCoffee = async (newCoffee) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCoffee),
      });

      if (!response.ok) {
        throw new Error('Failed to add coffee');
      }

      const addedCoffee = await response.json();
      setCoffeeList((prevCoffees) => [...prevCoffees, addedCoffee]);
      setCoffeeName(''); // Clear input after adding
      setStatus('');     // Clear status after adding
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoffee = {
      Coffee: coffeeName,
      status: status,
    };
    addCoffee(newCoffee);
  };

  return (
    <CoffeeContext.Provider value={{ coffeeList, handleSubmit, setCoffeeName, setStatus, coffeeName, status }}>
      <div>
        <h1>Coffee List</h1>
        <ul>
          {coffeeList.map((coffee) => (
            <li key={coffee.id}>{coffee.Coffee} - {coffee.status}</li>
          ))}
        </ul>
        <h2>Add a New Coffee</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Coffee Name"
            value={coffeeName}
            onChange={(e) => setCoffeeName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <button type="submit">Add Coffee</button>
        </form>
      </div>
      {children} {/* Render child components */}
    </CoffeeContext.Provider>
  );
};

// Export the provider and custom hook
export default CoffeeProvider;
