import { useReducer } from 'react';
import CartContext from './cart.context';

const defaultCartState = {
    items: [],
    amount: 0
};

const cartReducer = (state, action) => {
    if(action.type = 'ADD_ITEM_TO_CART') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            amount: updatedTotalAmount
        };
    }

    return defaultCartState;
}

// component to manage current context to data, and provide the context for components
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD_ITEM_TO_CART', item: item});
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE_ITEM_FROM_CART', id: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;