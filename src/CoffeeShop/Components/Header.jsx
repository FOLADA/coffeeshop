import React, { useState } from 'react';
import CoffeeHomePageList from '../coffeeHomePageList';
import CapuccinoList from './CapuccinoList';
import Icedcoffee from './IcedCoffee';
import LatteList from './LatteList';
import { Link } from 'react-router-dom';
import { useCoffee } from '../../API';

const coffeeTypes = [
  { name: 'Capuccino', Component: CapuccinoList },
  { name: 'Iced Coffee', Component: Icedcoffee },
  { name: 'Latte', Component: LatteList }
];

function Header() {
  const [coffee, setCoffee] = useState([]);
  const { RemoveCoffee, coffeeList, GetCoffees, onFormSubmit, toggleComplete, deleteCoffees } = useCoffee();

  const addCoffee = (type) => {
    const newCoffee = { id: coffee.length + 1, status: false, name: type };
    setCoffee([...coffee, newCoffee]);
  };

  const removeCoffee = (id) => {
    setCoffee(coffee.filter(coff => coff.id !== id));
  };

  return (
    <>
      <header>
        <div className='container'>
          <img src="https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-logo-elements-logo-objects-3.png" alt="Coffee" className='logo'/>
          <h2>Welcome to Coffee Shop</h2>
        </div>
        <div className='Btncontainer'>
          <button onClick={() => addCoffee('Empty Cup')}>+ Add empty cup</button>
          <div className='btnss'>
            <div className='hiddenButtons'>
                {coffeeTypes.map(({ name }) => (
                <button key={name} onClick={() => addCoffee(name)}>+ {name}</button>
                ))}
            </div>
            <Link to={'/About'} className='link'>About us</Link> 
          </div>
        </div>
      </header>
      <div className='contain'>
        {coffee.map(({ id, status, name }) => {
          const CoffeeComponent = coffeeTypes.find(type => type.name === name)?.Component || CoffeeHomePageList;
          return (
            <CoffeeComponent
              key={id}
              id={id}
              Status={status}
              Remove={removeCoffee}
              name={name}
            />
          );
        })}
      </div>
    </>
  );
}

export default Header;
