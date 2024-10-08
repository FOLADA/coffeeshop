import CoffeeProvider from './API';
import './App.css';
import CoffeeHomePage from './CoffeeShop/coffeeHomePage'; 

function App() {
  return (
    <CoffeeProvider>
      <CoffeeHomePage />
    </CoffeeProvider>
  );
}

export default App;
