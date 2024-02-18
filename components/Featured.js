import { styled } from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import FlyingButton from "./FlyingButton";
import { RevealWrapper } from "next-reveal";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding-bottom: 20px;
  @media screen and (min-width: 768px) {
    padding: 50px 0;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img.main {
    max-width: 70%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.5fr 1.2fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 70%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={"left"}>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={"/product/" + product._id}
                    outline={1}
                    $white
                  >
                    Read More
                  </ButtonLink>
                  <FlyingButton
                    $white
                    _id={product._id}
                    src={product.images?.[0]}
                  >
                    <CartIcon />
                    Add to cart
                  </FlyingButton>
                </ButtonsWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <Column>
            <RevealWrapper>
              <img
                className="main"
                src={product.images[2]}
                alt="featured_img"
              />
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
