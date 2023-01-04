import { useContext, useEffect, useState } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => { return currentNum + item.amount; }, 0);
    const buttonClasses = `${styles.button} ${buttonIsHighlighted ? styles.bump : ''}`;

    // pull out items, set in the useEffect would run every time when something changes in the cartCtx, if we pass the whole cartCtx object as dependency
    const { items } = cartCtx;  

    useEffect(() => {
        if(items.length === 0) {
            return;
        }

        setButtonIsHighlighted(true);
        // remove bump class, so bump effect doesnt run only when class is added for the first time
        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
            <button className={buttonClasses} onClick={props.onClick}>
                <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
                <span className={styles.badge}> {numberOfCartItems} </span>
        </button>
    );
};

export default HeaderCartButton;