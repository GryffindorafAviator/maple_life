import React, { useState, useEffect } from 'react';
import { Text, TextProps } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

type Props = TextProps & {
    children: React.ReactNode;
    textColor?: string;
};

const RedHatText: React.FC<Props> = ({ children, style, textColor, ...props }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'RedHatText-SemiBold': require('../assets/fonts/RedHatText-SemiBold.ttf'),
            });
            setFontsLoaded(true);
        };
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        // <View style={{ color=textColor }}>
            <Text 
                {...props} 
                style={[style, { fontFamily: 'RedHatText-SemiBold', color: textColor }]}
            >
                {children}
            </Text>
        // </View>
        
    );
};

export default RedHatText;