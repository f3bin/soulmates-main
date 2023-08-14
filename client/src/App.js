import './App.css';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/authSlice';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './pages/home/Home';
import Welcome from './pages/welcomePage/Welcome';
import Profile from './pages/profile/Profile';
import CompleteProfile from './pages/profile-creation/ProfileCreation';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      dispatch(fetchCurrentUser(storedToken));
    }
  }, [dispatch]);

  if (authStatus === 'loading') {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Use conditional rendering for protected routes */}
        {isAuthenticated ? (
          <>
        
            <Route path="/:id/*" element={<Welcome />} />
            <Route path="/:id/profile" element={<Profile />} />
            <Route path="/:id/profile/complete-profile" element={<CompleteProfile />} />
          </>
        ) : (
          <>
            {/* Redirect to login if not authenticated */}
            <Route path="/:id/*" element={<Navigate to="/login" />} />
            <Route path="/:id/profile" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      {authStatus === 'failed' && <div className="error">{authError}</div>}
    </div>
  );
}

export default App;
