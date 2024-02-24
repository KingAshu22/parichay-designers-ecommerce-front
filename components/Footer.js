import React from "react";
import styled from "styled-components";

// Define your styled components here
const FooterContainer = styled.footer`
  margin-top: 80px;
  background-color: #f8f8f8; /* Adjust the color as needed */
  padding: 20px;
  color: #333; /* Adjust text color as needed */
  font-size: 0.9rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h4`
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const FooterLink = styled.a`
  color: #333; /* Adjust link color as needed */
  text-decoration: none;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid #ddd; /* Adjust border color as needed */
  padding-top: 20px;
  font-size: 0.8rem;
`;

const SocialMediaIcons = styled.div`
  font-size: 1.6rem; /* Adjust icon size as needed */
  & > * {
    margin: 0 5px;
  }
`;

// Your component
const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterHeading>Information</FooterHeading>
        <FooterLink href="#">Talk To Us</FooterLink>
        <FooterLink href="#">Shipping In India</FooterLink>
        <FooterLink href="#">International Shipping</FooterLink>
        <FooterLink href="#">Returns and Refunds</FooterLink>
      </FooterSection>
      <FooterSection>
        <FooterHeading>Customer Service</FooterHeading>
        <FooterLink href="#">Returns & Exchanges</FooterLink>
        <FooterLink href="#">Track Your Order</FooterLink>
      </FooterSection>
      <FooterSection>
        <FooterHeading>Shop</FooterHeading>
        <FooterLink href="#">Kurta</FooterLink>
        <FooterLink href="#">Sherwani</FooterLink>
      </FooterSection>
      <FooterSection>
        <FooterHeading>About Us</FooterHeading>
        <FooterLink href="#">Our Story</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Refund Policy</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
      </FooterSection>
      <FooterBottom>
        <span>© 2024 Parichay Designer</span>
        <SocialMediaIcons>
          {/* Insert social media icons here */}
        </SocialMediaIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
