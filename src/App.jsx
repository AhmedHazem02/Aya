import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import './styles/global.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ===== Toast Notifications ===== */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: 'Cairo, sans-serif',
              direction: 'rtl',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: 'white' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: 'white' },
            },
          }}
        />
        {/* ===== Main Router ===== */}
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
