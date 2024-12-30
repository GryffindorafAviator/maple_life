import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; 
import LongButton from '@/components/LongButton';
import SnowBall from '../../assets/icons/snowBall.svg';
import SantHat from '../../assets/icons/santaHat.svg';
import ChristmasTree from '../../assets/icons/christmasTree.svg';
import DisplayCard from '@/components/DisplayCard';
import RedHatText from '@/components/RedHatSBText';
import SantaSleighD from '@/components/SantaSleighD';

export default function TrackingPage(): JSX.Element {
    const [sittingTime, setSittingTime] = useState(0);
    const [maxSittingTime, setMaxSittingTime] = useState(10); // Seconds
    const [isSitting, setIsSitting] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID
    const [showPicker, setShowPicker] = useState(false);

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
                setSittingTime(prev => {
                    if (prev >= maxSittingTime) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null; 
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

    const handleDurationChange = (duration: { hours: number, minutes: number }) => {
        const totalSeconds = duration.hours * 3600 + duration.minutes * 60;
        return totalSeconds;
    };

    return (
        <ImageBackground source={require('../../assets/images/chtree.jpg')} resizeMode='cover' style={styles.backgroundImage}>
            <BlurView intensity={15} style={styles.fullScreenBlur}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.title}>
                        <SantaSleighD textColor='#0077b6' fontSize={47}>Sitting Time</SantaSleighD>
                    </View>

                    <DisplayCard
                        backgroundImage={require('../../assets/images/snowfallbg.jpg')}
                        animatedImage={require('../../assets/images/sleigh.png')}
                        sittingTime={sittingTime}
                        leftOffset={sleighPosition}
                        textColor='#1d3557'
                        formatTime={formatTime}
                    />

                    <View style={styles.buttons}>
                        <LongButton icon={<SnowBall width={40} height={40} />} label="Set Sitting Time" onPress={() => setShowPicker(true)} />
                        <View style={styles.modalContainer}>
                            <TimerPickerModal
                                hideSeconds
                                visible={showPicker}
                                setIsVisible={setShowPicker}
                                onConfirm={(pickedDuration) => {
                                    setMaxSittingTime(handleDurationChange(pickedDuration));
                                    setShowPicker(false);
                                }}
                                onCancel={() => setShowPicker(false)}
                                LinearGradient={LinearGradient}
                                styles={{
                                    theme: "dark",
                                }}
                                modalProps={{
                                    overlayOpacity: 0.2,
                                }}
                            />
                            <LongButton icon={<SantHat width={40} height={40} />} label="Start" onPress={startSittingTimer} disabled={isSitting}/>
                            <LongButton icon={<ChristmasTree width={40} height={40} />} label="Reset" onPress={resetTimer} disabled={!isSitting && sittingTime === 0} />
                        </View> 
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
    },
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});