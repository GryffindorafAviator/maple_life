import React from 'react';
import { View, Image, ImageBackground, StyleSheet, Animated } from 'react-native';
import RedHatSBText from './RedHatSBText';

type Props = {
  backgroundImage: any;
  animatedImage: any;
  sittingTime: number;
  leftOffset: Animated.AnimatedInterpolation<number>;
  textColor: string;
  formatTime: (seconds: number) => string;
};

const DisplayCard: React.FC<Props> = ({ backgroundImage, animatedImage, sittingTime, leftOffset, textColor, formatTime }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} imageStyle={{ opacity: 0.7 }} style={styles.background}>
        <View style={styles.textWindow}>
          <RedHatSBText 
            style={styles.timer} 
            textColor={textColor}
            fontSize={30}
            fontWeight='bold'
          >
            {formatTime(sittingTime)}
          </RedHatSBText>
        </View>
        <Image source={require('../assets/images/snow.png')} style={styles.snow} resizeMode='cover' />
        <Animated.View style={[styles.animation, { left: leftOffset }]}>
          <Image source={animatedImage} style={styles.objectImage} resizeMode="contain" />
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 280,
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  background: {
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: '#ccc',
  },
  textWindow: {
    position: 'absolute',
    top: 80,
    left: 80,
    right: 80,
    bottom: 120,
    backgroundColor: 'rgba(202, 240, 248, 1)',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2, // Add border width
    borderColor: '#00b4d8', // Add border color
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
    elevation: 5, // Elevation for Android
    opacity: 1,
  },
  animation: {
    position: 'absolute',
    bottom: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectImage: {
    width: 40,
    height: 40,
  },
  timer: {
    fontSize: 40,
    textAlign: 'center',
  },
  snow: {
    position: 'absolute',
    bottom: -110,
    left: -100,
    width: 550,
    height: 200,
  },
});

export default DisplayCard;