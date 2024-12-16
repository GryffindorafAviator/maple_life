import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Animated, ImageBackground } from 'react-native';

export default function TrackingPage(): JSX.Element {
  const [sittingTime, setSittingTime] = useState(0);
  const [maxSittingTime, setMaxSittingTime] = useState(60);
  const [isSitting, setIsSitting] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

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

  return (
    <ImageBackground source={require('../../assets/images/whitebg.jpeg')} resizeMode='cover' style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tracking Page</Text>
        <Text style={{ textAlign: 'center' }}>{(sittingTime / maxSittingTime).toFixed(2)}</Text>

        <View style={styles.travelContainer}>
          <Text>
            Sitting Time: {sittingTime} / {maxSittingTime} secs
          </Text>

          <ImageBackground source={require('../../assets/images/snowfallbg.jpg')} style={styles.sleighContainer}>
            <Animated.View style={[styles.sleigh, { left: sleighPosition }]}>
              <Image source={require('../../assets/images/sleigh.png')} style={styles.sleighImage} resizeMode="contain" />
            </Animated.View>
          </ImageBackground>

          <Button title="Start Sitting Timer" onPress={startSittingTimer} disabled={isSitting} />
          <Button title="Reset Timer" onPress={resetTimer} disabled={!isSitting && sittingTime === 0} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', // Make the background transparent to show the image
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  travelContainer: {
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 50,
  },
  sleighContainer: {
    position: 'relative',
    justifyContent: 'center',
    height: 100, // Adjust based on your design
    width: '100%', // Set the width of the travel range
    borderRadius: 15, // Add rounded corners
    overflow: 'hidden', // Ensure the background respects the rounded corners
  },
  sleigh: {
    position: 'absolute',
    bottom: 0,
    width: 40, // Give the sleigh a fixed width
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleighImage: {
    width: 40,
    height: 40,
  },
});