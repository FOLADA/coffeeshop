import React, { useState } from 'react';

const CapuccinoList = ({ Status, Remove, id, name }) => {
  const [statuss, setStatus] = useState(!Status);  
  const [isUSD, setIsUSD] = useState(false);  
  const [ingredients, setIngredients] = useState([
    { name: 'Sugar', price: 0.5 },
    { name: 'Milk', price: 0.7 },
    { name: 'Water', price: 0.2 },
    { name: 'Coffee', price: 1.0 },
    { name: 'Ice', price: 0.3 },
    { name: 'Ice cream', price: 1.0 }
  ]);

  const [selectedIngredients, setSelectedIngredients] = useState(['Sugar', 'Milk', 'Water', 'Coffee', 'Ice', 'Ice cream']);

  const toggleStatus = () => {
    setStatus(!statuss);
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((ing) => ing !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const exchangeRate = 0.36;

  const calculateTotalPrice = () => {
    const totalGEL = selectedIngredients.reduce((total, ingredient) => {
      const found = ingredients.find(ing => ing.name === ingredient);
      return found ? total + found.price : total;
    }, 0);
    return isUSD ? (totalGEL * exchangeRate).toFixed(2) : totalGEL.toFixed(2);
  };

  const toggleCurrency = () => {
    setIsUSD(prev => !prev);
  };

  return (
    <div>
      <div className='coffeeRedact'>
        <div className={selectedIngredients.length > 0 ? 'filled-ICEcup' : 'empty-ICEcup'}></div>

        <div className='Name'>
          <h3>{name}</h3>
          <a onClick={toggleCurrency}><h3>Price: {isUSD ? `$${calculateTotalPrice()} USD` : `${calculateTotalPrice()} GEL`}</h3></a>
        </div>
        <div>
          <strong>Ingredients:</strong>
          <ul className='ull'>
            {selectedIngredients.length > 0 ? (
              selectedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>Add ingredients to your taste</li>
            )}
          </ul>
        </div>

        <div className='buttons'>
          <div className='mainButtons'>
            <button onClick={() => Remove(id)}>Remove exact coffee</button>
            <button onClick={toggleStatus}>
              {statuss ? '+ Add ingredients' : '- Add ingredients'}
            </button>
          </div>

          <div className={statuss ? "closed" : "opened"}>
            {ingredients.map((ingredient) => (
              <button key={ingredient.name} onClick={() => toggleIngredient(ingredient.name)}>
                {selectedIngredients.includes(ingredient.name) ? `- ${ingredient.name} ($${ingredient.price})` : `+ ${ingredient.name} ($${ingredient.price})`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapuccinoList;
