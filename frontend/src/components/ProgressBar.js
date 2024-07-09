import React from 'react';
import './styles/ProgressBar.css'; // Asegúrate de importar el archivo de estilos CSS

const ProgressBar = ({ percent }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percent}%` }}>
        <span className="progress-text">{percent}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
