import { useRef, useEffect, useState } from 'react';
import { ReactComponent as Close } from '../../assets/icons/close-24px.svg'
import './Modal.scss';


export default function Modal ({ isOpen, onClose, children, clearFields }) {
    const modalRef = useRef(null);

    const [ modalOpen, setModalOpen ] = useState(isOpen);

    const handleCloseModal = () => {
        onClose();
        clearFields();
        setModalOpen(false);
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
            <div autoFocus className='modal__content'>
                <div className='modal__toolbar'>
                  <span className='modal__close-icon'>
                    <Close onClick={handleCloseModal}/>
                  </span>
                </div>
                {children}
            </div>
        </dialog>
      );
};