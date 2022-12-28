import styles from './ModalOverlay.module.css';

// children will holds the value of content passed between opening and closing tags of Modal component
const ModalOverlay = (props) => {
    return (
        <div className={styles['modal-overlay']}>
            <div className={styles.content}> {props.children} </div>
        </div>
    );
}

export default ModalOverlay;