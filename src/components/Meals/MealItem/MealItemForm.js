import { useRef } from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        // get access to Input through ref, so entere value can be accessed here
        const enteredAmount = amountInputRef.current.value;         // always current, when using ref! value: value of the input,
        const enteredAmountNumber = +enteredAmount;                 // because ref refers to an Input html element

        if(enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            return;
        }

        
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
        </form>
    )
};

export default MealItemForm;