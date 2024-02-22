import React from 'react';
import Lottie from 'lottie-react-native';
import { Images } from '@config';
/**
 * Component for GradientContainer
 *@function NoDataFound
 */
export default function Loader({ style, small }) {
  return (
    <Lottie
      source={Images.Loading}
      style={[
        {
          height: small ? 40 : 120,
          width: small ? 40 : 120,
          alignSelf: 'center',
        },
        style,
      ]}
      autoPlay
      loop
    />
  );
}
