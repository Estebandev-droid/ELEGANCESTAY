import React from 'react';
import styled from 'styled-components';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(15px);
`;

const ModalContainer = styled.div`
  background: #f5f5f5;
  color: #333333;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, rgba(255, 56, 92, 1), rgba(255, 56, 92, 0.8));
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(255, 56, 92, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(255, 56, 92, 0.8);
  }

  svg {
    stroke: #fff;
    transition: stroke 0.3s ease;
  }

  &:hover svg {
    stroke: #333;
  }
`;

export default Modal;
