import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM_TO_CART') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems; 

        // if item already exists in the cart, dont add the same item as a new item again
        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount    // updating the amount for the found item
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
            console.log('updatedItems:', updatedItems);
        }
        // if item added to the cart for the first time
        else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'REMOVE_ITEM_FROM_CART') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR_ITEMS_FROM_CART') {
        return defaultCartState;
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

    const clearItemsFromCart = items => {
        dispatchCartAction({type: 'CLEAR_ITEMS_FROM_CART', items: items});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearItems: clearItemsFromCart
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;