import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
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
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <ImageWrapper>
        <BigImage src={activeImage} />
      </ImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            active={image === activeImage}
            key={image}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
