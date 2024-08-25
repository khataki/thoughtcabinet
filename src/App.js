import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ThoughtCabinet from './components/ThoughtCabinet';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route
          path="/cabinet"
          element={authToken ? <ThoughtCabinet /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;