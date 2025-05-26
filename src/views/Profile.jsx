import {
  ProfileWrapper, ContentSection, ImageSection, Content, MotionUserInfo, CartSection,
  TitleSection, ClearButton, CartTitle, MotionCartItem, Total, ButtonGroup
} from "./Profile.styled";
import NavBar from "../components/nav/NavBar";
import { FaTrashAlt, FaBroom } from "react-icons/fa";
import { useProfileLogic } from "../hooks/useProfileLogic";

const Profile = () => {
  const { user, cart, handleClearCart, handleRemoveProduct, goToCheckOut } = useProfileLogic();

  if (!user) return <p>You are not log in</p>

  return (
    <ProfileWrapper>
      <ContentSection>
        <NavBar />
        <Content>
          <MotionUserInfo
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </MotionUserInfo>

          <CartSection>
            <TitleSection>
              <CartTitle>Your cart</CartTitle>
              {cart.items.length > 0 &&
                <ClearButton className="clear-btn" onClick={handleClearCart} aria-label='Clear cart'>
                  <FaBroom size={25} />
                </ClearButton>
              }
            </TitleSection>
            {cart && cart.items.length > 0 ? (
              <>
                <ul>
                  {cart.items.map((item, index) => (
                    <MotionCartItem
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="image-container">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="info-container">
                        <div className="text">
                          <h3>{item.product.name}</h3>
                          <p>{item.product.description}</p>
                          <p className='price'><strong>Price:</strong> ${item.product.price}</p>
                        </div>
                        <button className="remove-btn" onClick={() => handleRemoveProduct(item.product.id)} aria-label="Remove product">
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </MotionCartItem>
                  ))}
                </ul>
                <Total data-testid="total">Total: ${cart.total}</Total>
                <ButtonGroup>
                  <button onClick={goToCheckOut}>
                    CheckOut
                  </button>
                </ButtonGroup>
              </>
            ) : (
              <p>You don't have products on your cart yet.</p>
            )}
          </CartSection>
        </Content>
      </ContentSection>
      <ImageSection />
    </ProfileWrapper>
  )
};

export default Profile;