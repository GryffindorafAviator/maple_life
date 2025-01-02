import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import LongButton from '@/components/LongButton';
import CandyCane from '../../assets/icons/candyCane.svg';
import XmasTree from '../../assets/icons/xmasTree.svg';
import Gift from '../../assets/icons/gift.svg';
import DisplayCard from '@/components/DisplayCard';
import SantaSleighD from '@/components/SantaSleighD';

export default function TrackingPage(): JSX.Element {
    const [eatingTime, setEatingTime] = useState(0);
    const maxEatingTime = 20 * 60; // 20 minutes
    const [isEating, setIsEating] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    useEffect(() => {
        const travelDistance = eatingTime / maxEatingTime;
        Animated.timing(progress, {
            toValue: travelDistance,
            duration: 500,
            useNativeDriver: false, // Important for percentage based animation
        }).start();
    }, [eatingTime]);

    const startEatingTimer = () => {
        if (!isEating) {
            setIsEating(true);
            setStartTime(Date.now());
            intervalRef.current = setInterval(() => {
                setEatingTime(prev => {
                    if (prev >= maxEatingTime) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null; 
                        alert('Great Mimi!');
                        return maxEatingTime; // Ensure it doesn't go over max
                    }
                    return prev + 1;
                });
            }, 1000); // ms
            return () => clearInterval(intervalRef.current!); // Cleanup on unmount
        }
    };

    const stopEatingTimer = () => {
      setIsEating(false);
      const endTime = Date.now();
      setEndTime(endTime);
      
      if (startTime !== null) {
        const duration = (endTime - startTime) / 1000 / 60;
        if (duration < 20) {
          alert('You need to eat slower!');
        }
      }
    };

    const resetTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setEatingTime(0);
        progress.setValue(0);
        setIsEating(false); 
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

    return (
        <ImageBackground source={require('../../assets/images/mimicatfull.png')} resizeMode='cover' style={styles.backgroundImage}>
            <BlurView intensity={15} style={styles.fullScreenBlur}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.title}>
                        <SantaSleighD textColor='#ff90b3' fontSize={50}>Eating Time</SantaSleighD>
                    </View>

                    <DisplayCard
                        backgroundImage={require('../../assets/images/pinkbg.jpeg')}
                        animatedImage={require('../../assets/images/reindeer.png')}
                        duringTime={eatingTime}
                        leftOffset={sleighPosition}
                        textColor='#1d3557'
                        formatTime={formatTime}
                    />

                    <View style={styles.buttons}>
                        <LongButton icon={<Gift width={40} height={40} />} label="Start" onPress={startEatingTimer} color='#ff8585' buttonDisabledColor='#ffcad4' />
                        <LongButton icon={<CandyCane width={40} height={40} />} label="Finish" onPress={stopEatingTimer} color='#ff8585' buttonDisabledColor='#ffcad4' />
                        <LongButton icon={<XmasTree width={40} height={40} />} label="Reset" onPress={resetTimer} disabled={!isEating && eatingTime === 0} color='#ff8585' buttonDisabledColor='#ffcad4'/>
                       
                    </View>
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
        marginTop: 20,
    },
    buttons: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});