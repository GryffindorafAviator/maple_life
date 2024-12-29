import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, Image, StyleSheet, Animated, ImageBackground, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; 
import LongButton from '@/components/longButton';
import SnowBall from '../../assets/icons/snowBall.svg';
import SantHat from '../../assets/icons/santaHat.svg';
import ChristmasTree from '../../assets/icons/christmasTree.svg';

export default function TrackingPage(): JSX.Element {
  const [sittingTime, setSittingTime] = useState(0);
  const [maxSittingTime, setMaxSittingTime] = useState(10); // Seconds
  const [isSitting, setIsSitting] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID
  const [showPicker, setShowPicker] = useState(false);
  // const [tempHours, setTempHours] = useState(0); // Temporary state for hours
  // const [tempMinutes, setTempMinutes] = useState(1); // Temporary state for minutes

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'RedHatText-SemiBold': require('../../assets/fonts/RedHatText-SemiBold.ttf'),
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
  }, [sittingTime]);

  const startSittingTimer = () => {
    if (!isSitting) {
      setIsSitting(true);
      intervalRef.current = setInterval(() => {
        // setSittingTime(prev => {
        //   if (prev >= maxSittingTime) {
        //     clearInterval(intervalRef.current!);
        //     intervalRef.current = null; 
        //     console.log('clear interval');
        //     setIsSitting(false);
        //     console.log('isSitting', isSitting);
        //     setSittingTime(0);
        //     console.log('sittingTime', sittingTime);
        //     progress.setValue(0);
        //     console.log('progress', progress);
        //     // resetTimer();
        //     alert('Time to stand!');
        //     return maxSittingTime; // Ensure it doesn't go over max
        //   }
        //   return prev + 1;
        // });
        setSittingTime(prev => {
          if (prev >= maxSittingTime) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null; 
            // slog('progress', progress);
            // resetTimer();
            alert('Time to stand!');
            return maxSittingTime; // Ensure it doesn't go over max
          }
          return prev + 1;
        });
      }, 1000); // ms
      return () => clearInterval(intervalRef.current!); // Cleanup on unmount
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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

  // const handleDurationChange = (duration: { hours: number, minutes: number }) => {
  //   setTempHours(duration.hours);
  //   setTempMinutes(duration.minutes);
  // };

  // const handleDone = () => {
  //   const totalSeconds = tempHours * 3600 + tempMinutes * 60;
  //   setMaxSittingTime(totalSeconds);
  //   setShowPicker(false);
  // };

  // const handleDone = () => {
  //   setShowPicker(false);
  // };

  // const handleCancel = () => {
  //   setShowPicker(false);
  // };

  const handleDurationChange = (duration: { hours: number, minutes: number }) => {
    const totalSeconds = duration.hours * 3600 + duration.minutes * 60;
    return totalSeconds;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground source={require('../../assets/images/chtree.jpg')} resizeMode='cover' style={styles.backgroundImage}>
      <BlurView intensity={15} style={styles.fullScreenBlur}>
      <SafeAreaView style={styles.container}>
      
        <Text style={styles.title}>Tracking Page</Text>

        <View style={styles.travelContainer}>
            <ImageBackground source={require('../../assets/images/snowfallbg.jpg')} imageStyle={{opacity: 0.7}} style={styles.sleighContainer}>
              <View style={styles.textWindow}>
                <Text style={styles.sittingTimer}>
                  {formatTime(sittingTime)}
                </Text>
              </View>
              <Image source={require('../../assets/images/snow.png')} style={styles.snow} resizeMode='cover' />
              <Animated.View style={[styles.sleigh, { left: sleighPosition }]}>
                <Image source={require('../../assets/images/sleigh.png')} style={styles.sleighImage} resizeMode="contain" />
              </Animated.View>
            </ImageBackground>
        </View>

        {/* <Button title="Set Max Time" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <View style={styles.timerPicker}>
              <TimerPicker
                padWithNItems={3}
                hideSeconds
                minuteLabel="min"
                LinearGradient={LinearGradient}
                allowFontScaling={true}
                onDurationChange={handleDurationChange}
                styles={{
                    theme: "dark",
                    pickerItem: {
                        fontSize: 20,
                    },
                    pickerLabel: {
                        fontSize: 20,
                        right: -20,
                    },
                    pickerLabelContainer: {
                        width: 60,
                        height: 250
                    },
                    pickerItemContainer: {
                        width: 120,
                        height: 36
                    },
                    backgroundColor: "rgba(11, 161, 225, 1)", 
                }}
              />
              <Button title="Done" onPress={() => setShowPicker(false)} />
            </View>
          )} */}

        {/* <Button title="Set Max Time" onPress={() => setShowPicker(true)} /> */}
        <View style={styles.buttons}>
          <LongButton icon={<SnowBall width={40} height={40} />} label="Set Sitting Time" onPress={() => setShowPicker(true)} />
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker}
            onRequestClose={() => setShowPicker(false)}
          > */}
          {/* {showPicker && ( */}
            {/* //  */}
            {/* <View style={styles.modalContainer}> */}
            <View style={styles.modalContainer}>
              {/* <View style={styles.pickerButtonContainer}> */}
                {/* <Button title="Done" onPress={() => setShowPicker(false)} /> */}
              
                {/* <TimerPicker
                  padWithNItems={3}
                  hideSeconds
                  minuteLabel="min"
                  hourLabel="h"
                  LinearGradient={LinearGradient}
                  allowFontScaling={true}
                  onDurationChange={handleDurationChange}
                  styles={{
                      theme: "dark",
                      pickerItem: {
                          fontSize: 20,
                      },
                      pickerLabel: {
                          fontSize: 20,
                          right: -20,
                      },
                      pickerLabelContainer: {
                          width: 60,
                          height: 250
                      },
                      pickerItemContainer: {
                          width: 120,
                          height: 36
                      },
                      backgroundColor: "rgba(11, 161, 225, 1)", 
                  }}
                />  */}
              <TimerPickerModal
                hideSeconds
                visible={showPicker}
                setIsVisible={setShowPicker}
                onConfirm={(pickedDuration) => {
                  setMaxSittingTime(handleDurationChange(pickedDuration));
                  setShowPicker(false);
                }}
                onCancel={() => setShowPicker(false)}
                // closeOnOverlayPress
                // Audio={Audio}
                LinearGradient={LinearGradient}
                // Haptics={Haptics}
                styles={{
                    theme: "dark",
                }}
                modalProps={{
                    overlayOpacity: 0.2,
                }}
            />
            {/* </View> */}
          
            {/* <View style={{marginTop: 20}}> */}
              <LongButton icon={<SantHat width={40} height={40} />} label="Start" onPress={startSittingTimer} disabled={isSitting}/>
              <LongButton icon={<ChristmasTree width={40} height={40} />} label="Reset" onPress={resetTimer} disabled={!isSitting && sittingTime === 0} />
              {/* <Button title="Start Sitting Timer" onPress={startSittingTimer} disabled={isSitting} />
              <Button title="Reset Timer" onPress={resetTimer} disabled={!isSitting && sittingTime === 0} /> */}
            </View> 
          </View>
          {/* // </View> */}
          {/* )} */}
          {/* </Modal> */}


                  {/* <Button title="Cancel" onPress={handleCancel} />
                  <Button title="Done" onPress={handleDone} />
                </View>
              </View>
            </View>
          </Modal> */}

        {/* <Button title="Set Max Time" onPress={() => setShowPicker(true)} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker}
            onRequestClose={() => setShowPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <TimerPicker
                  padWithNItems={3}
                  hideSeconds
                  minuteLabel="min"
                  secondLabel="sec"
                  LinearGradient={LinearGradient}
                  allowFontScaling={true}
                  onDurationChange={handleDurationChange}
                  styles={{
                      theme: "light",
                      pickerItem: {
                          fontSize: 20,
                      },
                      pickerLabel: {
                          fontSize: 20,
                          right: -20,
                      },
                      pickerLabelContainer: {
                          width: 60,
                          height: 250
                      },
                      pickerItemContainer: {
                          width: 120,
                          height: 36
                      },
                  }}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Cancel" onPress={handleCancel} />
                  <Button title="Done" onPress={handleDone} />
                </View>
              </View>
            </View>
          </Modal> */}

        

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
    opacity: 1
  },
  sleighContainer: {
    position: 'relative',
    justifyContent: 'center',
    height: '100%', // Adjust based on your design
    width: '100%', // Set the width of the travel range
    borderRadius: 35, // Add rounded corners
    overflow: 'hidden', // Ensure the background respects the rounded corners
    borderWidth: 0.3, // Set the width of the border
    borderColor: '#ccc', // Set the color of the border
  },
  snow: {
    position: 'absolute',
    bottom: -110,
    left: -100,
    width: 550, 
    height: 200,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  buttons: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },
});