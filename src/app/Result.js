// components/Result.js
import React from 'react';
// import styles from '../styles/Result.module.css';

const Result = ({ result }) => {
  return (
    <div className={styles.result}>
      {result !== null ? (
        <h2>{result === 1 ? 'Pneumonia Detected' : 'No Pneumonia Detected'}</h2>
      ) : (
        <h2>Upload an image to get a prediction</h2>
      )}
    </div>
  );
};

export default Result;
