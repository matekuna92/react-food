import { useContext , useState } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);

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

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>

            {isCheckout && <Checkout onCancel={props.onClose} />}
            {!isCheckout && modalActions}

        </Modal>
    );
};

export default Cart;