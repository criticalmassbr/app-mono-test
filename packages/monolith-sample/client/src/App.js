import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<TimelinePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
