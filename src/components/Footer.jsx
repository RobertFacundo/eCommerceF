import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width:100%;
  padding: 0.7rem 0;
  text-align: center;
  font-size: 0.9rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #0F0F0F;
  background-color: rgba(0, 0 ,0 ,0.5);

  position:fixed;
  bottom: 0;
  left:0;
  z-index:1000;

  transition: color 0.3s ease;

  &:hover{
    color:#FFFFFF;
  }
`;

const GitHubLink = styled.a`
  color: #eeeeee;
  text-decoration: none;
  font-weight: 800;
  transition: color 0.3s ease;

  &:hover{
    color:#FFFFFF;
  }
`;

const Footer = () => {
    return (
    <FooterContainer>
        Designed and developed by <GitHubLink href="https://github.com/RobertFacundo" target="_blank" rel="noopener noreferrer">Robert</GitHubLink>
    </FooterContainer>
 )
};

export default Footer;