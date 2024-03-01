import React, {useState} from 'react';

import HomePage from './components/HomePage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }
  
  return (
    <main className={`${isDarkMode ? 'dark' : ''}`}>
      <HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </main>
  );
}

export default App;
