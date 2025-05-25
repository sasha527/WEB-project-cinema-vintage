// src/main.jsx
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookingProvider } from './pages/BookingContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BookingProvider>
    <>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  </BookingProvider>
);
