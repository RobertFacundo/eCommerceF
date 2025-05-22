import { Link } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1.3rem 2rem;
  margin-bottom: 0.5rem;
  background-color: #3f5145;
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  color: #f3f4f6;
  text-decoration: none;
  position: relative;
  transition:color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #f3f4f6;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    
    &::after {
      width: 100%;
    }
  }
`;

const NavBar = () => {
    return (
        <NavWrapper>
            <StyledLink to='/Home'>Home</StyledLink>
            <StyledLink to='/Profile'>Profile</StyledLink>
        </NavWrapper>
    )
};

export default NavBar;