import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Animated, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function TrackingPage(): JSX.Element {
  const [sittingTime, setSittingTime] = useState(0);
  const [maxSittingTime, setMaxSittingTime] = useState(60);
  const [isSitting, setIsSitting] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Roboto-Bold': require('../../assets/fonts/RedHatText-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    const travelDistance = sittingTime / maxSittingTime;
    Animated.timing(progress, {
      toValue: travelDistance,
      duration: 500,
      useNativeDriver: false, // Important for percentage based animation
    }).start();
  }, [sittingTime, maxSittingTime, progress]);

  const startSittingTimer = () => {
    if (!isSitting) {
      setIsSitting(true);
      let interval = setInterval(() => {
        setSittingTime(prev => {
          if (prev >= maxSittingTime) {
            clearInterval(interval);
            alert('Time to stand!');
            setIsSitting(false);
            return maxSittingTime; // Ensure it doesn't go over max
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  };

  const resetTimer = () => {
    setSittingTime(0);
    progress.setValue(0);
    setIsSitting(false);
  };

  const sleighPosition = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground source={require('../../assets/images/chtree.jpg')} resizeMode='cover' style={styles.backgroundImage}>
      <BlurView intensity={15} style={styles.fullScreenBlur}>
      <SafeAreaView style={styles.container}>
      
        <Text style={styles.title}>Tracking Page</Text>
      
        <View style={styles.travelContainer}>
            <ImageBackground source={require('../../assets/images/snowfallbg.jpg')} style={styles.sleighContainer}>
              <View style={styles.textWindow}>
                <Text style={styles.sittingTimer}>
                  {/* Sitting Time{'\n'} */}
                  {formatTime(sittingTime)}
                </Text>
              </View>
              <Image source={require('../../assets/images/snow.png')} style={styles.snow} resizeMode='cover' />
              <Animated.View style={[styles.sleigh, { left: sleighPosition }]}>
                <Image source={require('../../assets/images/sleigh.png')} style={styles.sleighImage} resizeMode="contain" />
              </Animated.View>
            </ImageBackground>
        </View>

        <Button title="Start Sitting Timer" onPress={startSittingTimer} disabled={isSitting} />
        <Button title="Reset Timer" onPress={resetTimer} disabled={!isSitting && sittingTime === 0} />
        
      </SafeAreaView>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
  fullScreenBlur: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', // Make the background transparent to show the image
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  travelContainer: {
    width: 380,
    height: 280,
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // Add rounded corners
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
    elevation: 5, // Elevation for Android
  },
  sittingTimer: {
    fontSize:30,
    fontFamily: 'RedHatText-SemiBold',
    color: '#1d3557',
    marginBottom: 10
  },
  textWindow: {
    position: 'absolute',
    top: 80,
    left: 80,
    right: 80,
    bottom: 120,
    backgroundColor: 'rgba(202, 240, 248, 0.8)',
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
    opacity: 1
  },
  // blurContainer: {
  //   width: 400,
  //   height: 400,
  //   padding: 10,
  //   margin: 5,
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   overflow: 'hidden',
  //   borderRadius: 20,
  // },
  sleighContainer: {
    position: 'relative',
    justifyContent: 'center',
    height: '100%', // Adjust based on your design
    width: '100%', // Set the width of the travel range
    borderRadius: 35, // Add rounded corners
    overflow: 'hidden', // Ensure the background respects the rounded corners
    borderWidth: 0.3, // Set the width of the border
    borderColor: '#ccc', // Set the color of the border
    opacity: 0.7
  },
  snow: {
    position: 'absolute',
    bottom: -110,
    left: -100,
    width: 550, 
    height: 200,
    // opacity: 1
  },
  sleigh: {
    position: 'absolute',
    bottom: 15,
    width: 60, // Give the sleigh a fixed width
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleighImage: {
    width: 40,
    height: 40,
  },
});