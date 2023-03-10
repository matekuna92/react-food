import React from 'react';

import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    // {...props.input} : pass multiple attributes from outside. All key-value pairs are added as props to the input
    // e.g: id='1', type='text', 'name='input' -> all of these are added as props, so it can be configurable dynamically
    return (
        <div className={styles.input}>
            <label htmlFor={props.input.id}> {props.label} </label>
            <input ref={ref} {...props.input}></input>
        </div>
        );
});

export default Input;