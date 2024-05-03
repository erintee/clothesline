import { useRef, useEffect, useState } from 'react';
import { ReactComponent as Close } from '../../assets/icons/close-24px.svg'
import './Modal.scss';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';


export default function Modal ({ isOpen, onClose, children, handleSubmit, buttonText }) {
    const modalRef = useRef(null);

    const [ modalOpen, setModalOpen ] = useState(isOpen);

    const handleCloseModal = () => {
        if(onClose) {
            onClose();
        }
        setModalOpen(false)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          handleCloseModal();
        }
      };

    useEffect(() => {
        setModalOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
        if (modalOpen) {
          modalElement.showModal();
        } else {
          modalElement.close();
        }
      }
    }, [modalOpen]);

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
            <div className='modal__content'>
                <div className='modal__toolbar'>
                    <Close className='modal__close-icon' onClick={handleCloseModal}/>
                </div>
                {children}
            </div>
        </dialog>
      );
};