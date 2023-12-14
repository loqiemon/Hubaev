import styled from 'styled-components';


const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
      setIsOpen(false);
  }

  const handleClick = (e) => {
      e.stopPropagation();

  }

  return (
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent onClick={handleClick}>
          {children}
        </ModalContent>
      </ModalOverlay>
  );
};

export {Modal};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; 
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1000; 
`;

