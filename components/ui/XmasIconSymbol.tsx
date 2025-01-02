import React from 'react';
import { Image, ImageProps, StyleProp, ImageStyle } from 'react-native';

type XmasIconSymbolProps = {
  source: ImageProps['source'];
  size?: number;
  style?: StyleProp<ImageStyle>;
};

const XmasIconSymbol: React.FC<XmasIconSymbolProps> = ({ source, size = 28, style }) => {
  return (
    <Image
      source={source}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
};

export default XmasIconSymbol;