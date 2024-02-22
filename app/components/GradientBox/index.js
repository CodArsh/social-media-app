import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const GradientBox = ({ children, colors }) => {
  return (
    <LinearGradient
      colors={colors}
      style={{
        flex: 1,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBox;
