import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageWrapper = styled.div`
  text-align: center;
  @media (min-width: 768px) {
    width: 400px;
  }
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    top: 5%;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  max-height: calc(100vh - 40px); /* Maximum height of modal content */
  max-width: 480px; /* Maximum width of modal content */
  width: auto;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Hide horizontal scrollbar */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  border-radius: 5px;
  ${(props) =>
    props.active
      ? `border-color: #ccc`
      : `border-color: transparent; opacity: 0.7`};
  height: 40px;
  padding: 2px;
  cursor: pointer;
`;

export default function ProductImages({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 0 && activeImageIndex < images.length - 1) {
      // swipe left
      setActiveImageIndex((prevIndex) => prevIndex + 1);
    } else if (diff < 0 && activeImageIndex > 0) {
      // swipe right
      setActiveImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <ImageWrapper>
        <BigImage
          src={images[activeImageIndex]}
          onClick={openModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </ImageWrapper>
      <ImageButtons>
        {images.map((image, index) => (
          <ImageButton
            active={index === activeImageIndex}
            key={image}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>

      {modalOpen && (
        <Modal>
          <ModalContent ref={modalRef}>
            <BigImage
              src={images[activeImageIndex]}
              onClick={openModal}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
            <CloseButton onClick={closeModal}>X</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
