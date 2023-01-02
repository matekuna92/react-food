import { useContext } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    console.log('cartctx totalamount:', cartCtx.totalAmount);
    const cartHasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {

    }

    const cartItemRemoveHandler = id => {

    }

    const cartItems = <ul className={styles['cart-items']}>
    {cartCtx.items.map(cartItem =>
        <CartItem
            key={cartItem.id}
            name={cartItem.name}
            amount={cartItem.amount}
            price={cartItem.price}
            onAdd={cartItemAddHandler.bind(null, cartItem)}
            onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
        /> )}
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