import { Background, MotionContentCard, Title, InfoText, Note, BackButton } from './Success.styled';
import { FaReceipt, FaUser, FaMapMarkerAlt, FaMoneyBillWave, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useSuccessLogic } from '../hooks/useSuccessLogic';

const Success = () => {
  const { navigate, width, height, showConfetti, lastOrder, isCash } = useSuccessLogic();

  if (!lastOrder || !lastOrder.user) return <p>No recent order found</p>

  return (
    <Background>
      {showConfetti && <Confetti width={width} height={height} />}
      <MotionContentCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title>{isCash ? "🛒 Order Confirmed!" : "✅ Payment Successful!"}</Title>

        <InfoText><strong><FaReceipt color="#9b59b6" /></strong> {lastOrder.id}</InfoText>
        <InfoText><strong><FaUser color="#2980b9" /></strong> {lastOrder.user.name}</InfoText>
        <InfoText><strong><FaMapMarkerAlt color="#e74c3c" /></strong>{lastOrder.user.address}</InfoText>
        <InfoText><strong>{isCash ? <FaMoneyBillWave color="#27ae60" /> : <FaCreditCard color="#8e44ad" />}</strong> {isCash ? 'Cash on Delivery' : 'Credit/Debit Card'}</InfoText>
        <InfoText><strong><FaDollarSign color="#27ae60" /></strong> ${lastOrder.total}</InfoText>

        {isCash ? (
          <Note>(Please prepare the total amount upon delivery)</Note>
        ) : (
          <InfoText>Thanks for choosing us!</InfoText>
        )}
        <BackButton onClick={() => navigate('/Home')}>
          Back To Home
        </BackButton>
      </MotionContentCard>
    </Background>
  );
};

export default Success;