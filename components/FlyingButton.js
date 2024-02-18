import styled from "styled-components";
import { ButtonStyle } from "./Button";
import { primary } from "@/lib/colors";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
    ${(props) =>
      props.main
        ? `
          background-color: ${primary};
          color: white;
          border: 1px solid ${primary};
    `
        : `
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
    `}

  background-color: ${(props) => (props.white ? "#fff" : "#000")};
    color: ${(props) => (props.white ? "#000" : "#fff")};
    ${(props) =>
      props.white &&
      `
          background-color: white;
          color: black;
          border: 1px solid white;
    `}
  }
  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    display: none;
    max-width: 150px;
    max-height: 150px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCart(ev) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef?.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        //visible
        reveal.style.transform = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props._id)}
      >
        <img src={props.src} ref={imgRef} />
        <button onClick={(ev) => sendImageToCart(ev)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
