import { useRef, useState } from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        // get access to Input through ref, so entere value can be accessed here
        const enteredAmount = amountInputRef.current.value;         // always current, when using ref! value: value of the input,
        const enteredAmountNumber = +enteredAmount;                 // because ref refers to an Input html element

        // error if invalid values
        if(enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount' input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button> Add </button>
            {!amountIsValid && <p> Please enter a valid amount (1-5) </p>}
        </form>
    )
};

export default MealItemForm;