import { Fragment, useState } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showModalHandler = () => {
        setCartIsShown(true);
    }

    const hideModalHandler = () => {
        setCartIsShown(false);
    }

  return (
    <CartProvider>
        {cartIsShown && <Cart onClose={hideModalHandler} />}
        <Header onShowCart={showModalHandler} />
        <main>
            <Meals></Meals>
        </main>
    </CartProvider>
  );
}

export default App;
