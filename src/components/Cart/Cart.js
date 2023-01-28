import React, { useContext , useState } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    console.log('cartctx totalamount:', cartCtx.totalAmount);
    const cartHasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    }

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        // send both userdata and cart data
        await fetch('https://react-http-9c568-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userData: userData,
                orderedItems: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);

        cartCtx.clearItems(userData);
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

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClose}> Close </button>
        {cartHasItems && <button className={styles.button} onClick={orderHandler}> Order </button>}
    </div>

    // need to wrap because thera are multiple siblings
    const cartModalcontent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>

            {isCheckout && (
                <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler}/>
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p> Sending order data... </p>
    const didSubmitModalContent = <React.Fragment>
        <p> Successfully sent the order! </p>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}> Close </button>
        </div>
    </React.Fragment>

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalcontent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>;
}

export default Cart;