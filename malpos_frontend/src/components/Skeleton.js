import React from 'react';

const SkeletonCell = () => {
  return (
    <div className="skeleton-cell" style={{
        width: '100px', // Adjust the width as needed
      height: '15px', // Adjust the height as needed
      backgroundColor: '#e0e0e0', // Gray background color
      animation: 'skeleton-loading 1s infinite', // Add a loading animation
      borderRadius: '3px', // Rounded corners
      margin: '5px 0', // Margin between cells
    }}>
     
    </div>
  );
};

export default SkeletonCell;
