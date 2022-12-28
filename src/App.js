import { Fragment, useState } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const displayCardHandler = () => {
        setCartIsShown(!cartIsShown);
    }

  return (
    <Fragment>
        {cartIsShown && <Cart />}
        <Header onShowCart={displayCardHandler} />
        <main>
            <Meals></Meals>
        </main>
    </Fragment>
  );
}

export default App;
