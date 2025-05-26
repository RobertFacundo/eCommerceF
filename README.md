# Ecommerce Website

![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-orange)
[![Swagger](https://img.shields.io/badge/API-Swagger-orange)](http://authb.onrender.com/api)

This project consist of a 

frontend => (https://github.com/RobertFacundo/eCommerceF)

&

backend => (https://github.com/RobertFacundo/eCommerceB)

working together to provide an eCommerce.


## Deployment
-Frontend: Deployed to Vercel via the web interface, communicates with the backend API.

-Backend: Deployed to Render using the VSC CLI, handles authentication and data processing.

## Environment Variables
Set appropriate environment variables for both frontend and backend to define API URLs and other settings based on the deployment environment (development or production).

## 🛠️ Getting Started

Clone the frontend repo and install dependencies:

```bash
git clone https://github.com/RobertFacundo/eCommerceF.git
cd eCommerceF
npm install
npm run dev
```

---


# Frontend

This project (completely responsive) is built with React, and utilizes React Router to handle navigation across different views.

The eCommerce flow starts with an authentication screen, where users can register or log in. Upon successful authentication, they are redirected to the home page, where a list of products is rendered. From there, users can:

Navigate to their profile page using the NavBar.

Add new products from the profile view (if authorized).

Access the shopping cart to review selected items.

Proceed to checkout, where the order is confirmed.

Finally, they are redirected to a success screen indicating the purchase was completed.

## Responsive Design
The entire project is completely responsive, ensuring an optimal user experience on all devices, from mobile phones and tablets to desktop screens.

## Project Structure and Technologies
The project is designed to be scalable and modular, using:

Custom Hooks: Each component is connected to its own logic through custom hooks, keeping the UI separate from the logic.

Context API: Used for global state management (e.g., user auth, cart state).

Service Layer: API calls are abstracted into a services folder to keep the code clean and maintainable.

React Router: All navigation is handled using the Link and useNavigate from React Router DOM.

Styled Components: All components are styled using styled-components for scoped and dynamic styling.

## React Hooks in Use
The application leverages several key React features:

useEffect for lifecycle management and data fetching.

useContext for managing global states like authentication and cart.

useRef for referencing DOM elements or persisting values.

useNavigate for programmatic navigation.

### Component Testing
All major components have been properly tested. Unit tests have been implemented to ensure that each component works as expected and handles edge cases effectively. Additionally, integration tests validate the interaction between the frontend and backend to ensure smooth communication and correct functionality during the authentication process.

## 📁 Folder Structure

```txt
src/
├── App.jsx
├── main.jsx
├── setupTests.js
├── assets/
│   └── react.svg
├── components/
│   ├── Footer.jsx
│   ├── Footer.test.jsx
│   ├── LoginRegister.jsx
│   ├── LoginRegister.test.jsx
│   └── nav/
│       ├── NavBar.jsx
│       └── NavBar.test.jsx
├── contexts/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAddToCart.js
│   ├── useAuth.js
│   ├── useAuthForm.js
│   ├── useCheckOutForm.js
│   ├── useCheckOutHandler.js
│   ├── useHomeLogic.js
│   ├── useProducts.js
│   ├── useProfileLogic.js
│   └── useSuccessLogic.js
├── services/
│   ├── authServices.js
│   ├── cartService.js
│   ├── productService.js
│   └── simulatePayment.js
├── utils/   # Utility functions (e.g. formatters, validators)
├── views/
│   ├── Authentication.jsx
│   ├── CheckOut.jsx
│   ├── CheckOut.styled.js
│   ├── CheckOut.test.jsx
│   ├── Home.jsx
│   ├── Home.styled.js
│   ├── Home.test.jsx
│   ├── Profile.jsx
│   ├── Profile.styled.js
│   ├── Profile.test.jsx
│   ├── Success.jsx
│   ├── Success.styled.js
│   └── Success.test.jsx
```

## 🚀 Technologies Used

### Main Dependencies

- **React 19** – Frontend library
- **React Router DOM v7** – Client-side routing
- **Styled Components** – CSS-in-JS styling
- **Axios** – HTTP client for API requests
- **Framer Motion** – Animations and transitions
- **React Confetti** – Visual feedback for success actions
- **React Icons** – Icon library
- **@react-hook/window-size** – Responsive hooks for screen size

### Dev & Testing
- **Vite** – Frontend build tool for fast development
- **Vitest** – Unit testing framework
- **Testing Library (React, DOM, User Event)** – Component and user interaction testing
- **JSDOM** – Simulated DOM environment for testing
- **ESLint** – Code linting for quality and consistency

### Patterns & Tools
- **Custom Hooks** – Each component is powered by its own custom logic hook
- **Context API** – Auth and global state management
- **Services** – Decoupled service layer for API logic
- **Component-Driven Architecture** – UI and logic separation for scalability

----

## 📬 Contact

Created by **Facundo Robert** – [GitHub](https://github.com/RobertFacundo)  
Feel free to reach out for collaboration or feedback!

## 📄 License

This project is licensed under the [MIT License](LICENSE).
----
