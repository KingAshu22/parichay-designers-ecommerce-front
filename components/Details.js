import React from "react";
import styled from "styled-components";
import TruckIcon from "./icons/TruckIcon";
import SecuredIcon from "./icons/SecuredIcon";
import CashIcon from "./icons/CashIcon";
import CallIcon from "./icons/CallIcon";
import ProductIcon from "./icons/ProductIcon";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap onto the next line */
  justify-content: space-between; /* This may need adjustment with flex-wrap */
  align-items: center;
  padding: 40px;
  max-width: 1080px;
  margin: auto;
  gap: 35px; /* This adds space between wrapped items */
  margin-top: 100px;

  @media (max-width: 768px) {
    justify-content: center; /* Center items on smaller screens */
    padding: 40px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  /* Add margins if necessary for spacing */
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Adjust padding as necessary */
  width: 60px; /* Adjust width as necessary */
  height: 60px; /* Adjust height as necessary */
  border: 2px solid #000;
  border-radius: 50%;
  background-color: #222;
  color: #fff;

  /* Adjust icon size for mobile */
  @media (max-width: 768px) {
    padding: 15px;
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
`;

const Text = styled.div`
  // You can also adjust the text size for mobile if necessary
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const DetailItem = ({ icon, text }) => (
  <Item>
    <IconContainer>{icon}</IconContainer>
    <Text>{text}</Text>
  </Item>
);

const Details = () => {
  return (
    <Container>
      <DetailItem icon={<TruckIcon />} text="Free Shipping" />
      <DetailItem icon={<CashIcon />} text="Cash On Delivery" />
      <DetailItem icon={<SecuredIcon />} text="Secured Payments" />
      <DetailItem icon={<CallIcon />} text="Easy Customer Support" />
      <DetailItem icon={<ProductIcon />} text="Easy Returns" />
    </Container>
  );
};

export default Details;
