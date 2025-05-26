import { useCheckOutForm } from "../hooks/useCheckOutForm";
import NavBar from "../components/nav/NavBar";
import { CheckOutWrapper, ContentSection, ImageSection, Content, MotionCardSection, Title, StyledInput, RadioGroup, RadioTitle, OptionsWrapper, TotalAmount, SubmitButton } from "./CheckOut.styled";
import { Loader, CenteredContainer, Message} from "./Home.styled";

const CheckOut = () => {
  const { cart, shippingData, paymentMethod, handleChange, handleSubmit, setPaymentMethod } = useCheckOutForm();

  if (!cart) {
    return (
      <CenteredContainer>
        <Loader />
        <Message>Loading CheckOut View</Message>
      </CenteredContainer>
    );
  }
  const totalAmount = cart.total;
  return (
    <CheckOutWrapper>
      <ContentSection>
        <NavBar />
        <Content>
          <MotionCardSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Title>CheckOut</Title>
            <form onSubmit={handleSubmit} role='form'>
              <StyledInput
                type="text"
                name='name'
                placeholder='Your name'
                value={shippingData.name}
                onChange={handleChange}
                required
              />
              <br />
              <StyledInput
                type="text"
                name='address'
                placeholder='Shipping address'
                value={shippingData.address}
                onChange={handleChange}
                required
              />
              <RadioGroup>
                <RadioTitle>Payment Method</RadioTitle>
                <OptionsWrapper>
                  <label>
                    <input
                      type="radio"
                      name='paymentMethod'
                      value='card'
                      onChange={() => setPaymentMethod('card')}
                      checked={paymentMethod === 'card'}
                    />
                    Credit/Debit Card
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name='paymentMethod'
                      value='cash'
                      onChange={() => setPaymentMethod('cash')}
                      checked={paymentMethod === 'cash'}
                    />
                    Cash on Delivery
                  </label>
                </OptionsWrapper>
              </RadioGroup>
              <TotalAmount>Amount: ${totalAmount}</TotalAmount>
              <SubmitButton type="submit">Confirm Order</SubmitButton>
            </form>
          </MotionCardSection>
        </Content>
      </ContentSection>
      <ImageSection />
    </CheckOutWrapper>
  );
};

export default CheckOut;