import { useContext } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount}`;
    console.log('cartctx totalamount:', cartCtx.totalAmount);
    const cartHasItems = cartCtx.items.length > 0;

    const cartItems = <ul className={styles['cart-items']}>
    {cartCtx.items.map(cartitem =>
        <li> {cartitem.name} </li>)}
    </ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}> Close </button>
                {cartHasItems && <button className={styles.button}> Order </button>}
            </div>
        </Modal>
    );
};

export default Cart;