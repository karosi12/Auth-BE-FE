import React, { useState, useEffect } from 'react';
import '../../assets/styles/loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    let timer = window.setTimeout(() => {
      if (progress < 100) {
        const newProgress = progress + 10;
        setProgress(newProgress);
      } else {
        window.clearTimeout(timer);
        setProgress(60);
      }
    }, 300);
    return () => {
      window.clearTimeout(timer);
    };
  }, [progress]);

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <span className="loading-spinner" />
    </div>
  );
};

export default Loader;
