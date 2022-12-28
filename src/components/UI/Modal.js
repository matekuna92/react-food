import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';
import Backdrop from './Backdrop';
import ModalOverlay from "./ModalOverlay";

const Modal = (props) => {
    const portalElements = document.getElementById('overlays');


// without portal:
//    return (
//        <Fragment>
//            <Backdrop />
//            <ModalOverlay> {props.children} </ModalOverlay>
//        </Fragment>
//    );

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElements)}
            {ReactDOM.createPortal(<ModalOverlay> {props.children} </ModalOverlay>, portalElements)}
        </Fragment>
    );
}

export default Modal;