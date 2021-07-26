import React, { Component } from 'react';
import Styles from './Modal.module.css';
import ButtonIcon from '../Button/ButtonIcon';
import PropTypes from 'prop-types';
import { ReactComponent as IconAddContact } from '../../icon/close.svg';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleIsVisible();
    }
  };

  closeBackdropOnClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.toggleIsVisible();
    }
  };

  render() {
    const { toggleIsVisible, children } = this.props;
    const { closeBackdropOnClick } = this;
    return createPortal(
      <div className={Styles.Backdrop} onClick={closeBackdropOnClick}>
        <div className={Styles.Modal}>{children}</div>
        <ButtonIcon
          toggleIsVisible={toggleIsVisible}
          aria="close"
          classButton="ButtonIcon"
        >
          <IconAddContact width="20px" height="20px" />
        </ButtonIcon>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  toggleIsVisible: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
