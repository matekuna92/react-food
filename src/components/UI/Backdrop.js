import styles from './Backdrop.module.css';

const Backdrop = (props) => {
    return (
        <div className={styles.backdrop} onClick={props.onClose}></div>
    );
}

export default Backdrop;