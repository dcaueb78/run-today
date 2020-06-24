import React from 'react';
import LottieView from 'lottie-react-native';

import loadingAnimation from '../../../assets/loading_animation.json';

const Loading: React.FC = () => {
  return (
    <LottieView
      source={loadingAnimation}
      autoPlay
      resizeMode="contain"
      style={{
        backgroundColor: 'rgba(49,46,56, 0.5)',
        zIndex: 2,
      }}
    />
  );
};

export { Loading };
