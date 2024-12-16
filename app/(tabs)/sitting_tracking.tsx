import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Animated, Easing, Button } from 'react-native';

export default function App() {
  const [sittingTime, setSittingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const maxSittingTime = 10; // Reduced for faster testing

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSittingTime((prev) => {
          if(prev >= maxSittingTime){
            setIsRunning(false)
            return maxSittingTime
          }
          return prev + 1
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: sittingTime / maxSittingTime,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [sittingTime]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.snowGlobe}>
        <Animated.Image
          source={require('../../assets/images/snowglobe.png')}
          style={[styles.snowGlobeImage, { transform: [{ rotate }] }]}
        />
        <View style={[styles.progressOverlay, { height: `${(1 - (sittingTime / maxSittingTime)) * 100}%` }]}>
        </View>
        <Text style={styles.timerText}>{sittingTime}</Text>
      </View>
        <View style = {styles.buttonContainer}>
            <Button
                title = {isRunning ? "Stop Sitting" : "Start Sitting"}
                onPress = {() => setIsRunning(!isRunning)}
                disabled = {sittingTime === maxSittingTime}
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snowGlobe: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  snowGlobeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  progressOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  timerText: {
    fontSize: 24,
    color: 'white',
    position: 'absolute',
    top: '40%',
  },
    buttonContainer:{
        marginTop: 20
    }
});