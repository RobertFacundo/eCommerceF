import NavBar from "../components/nav/NavBar";
import { HomeWrapper, ImageSection, ContentSection, MotionTitle, MotionWelcomeMessage, ProductList, MotionProductItem, Loader, Message, CenteredContainer } from "./Home.styled";
import { useHomeLogic } from "../hooks/useHomeLogic";

const Home = () => {
  const { user, isInitializing, products, loading, error, recentlyAddedId, handleAdd } = useHomeLogic();

  if (isInitializing) {
    return (
      <CenteredContainer>
        <Loader />
        <Message>Loading user session...</Message>
      </CenteredContainer>
    );
  };

  if (!user) {
    return (
      <CenteredContainer>
        <Message>You are not logged in.</Message>
      </CenteredContainer>
    );
  }

  return (
    <HomeWrapper>
      <ContentSection>
        <NavBar />
        <MotionWelcomeMessage
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome, {user.username}!
        </MotionWelcomeMessage>

        {loading && (
          <>
            <Loader />
            <Message>Loading products...</Message>
          </>
        )}
        {error && <Message>Oops, products can't be displayed</Message>}

        {!loading && !error && (
          <>
            <MotionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >Available products</MotionTitle>
            <ProductList>
              {products.map((product, index) => (
                <MotionProductItem
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="info-container">
                    <div className="text">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                    <button
                      onClick={() => handleAdd(product.id)}
                      disabled={recentlyAddedId === product.id}
                    >
                      {recentlyAddedId === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div >
                </MotionProductItem>
              ))}
            </ProductList>
          </>
        )}
      </ContentSection>
      <ImageSection />
    </HomeWrapper>
  )
};

export default Home;