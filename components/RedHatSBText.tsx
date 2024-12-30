import React, { useState, useEffect } from 'react';
import { Text, TextProps } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

type Props = TextProps & {
    children: React.ReactNode;
    textColor?: string;
    fontSize?: number;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
};

const RedHatSBText: React.FC<Props> = ({ children, style, textColor, fontSize, fontWeight, ...props }) => {
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
            <Text 
                {...props} 
                style={[style, { fontFamily: 'RedHatText-SemiBold', color: textColor, fontSize: fontSize, fontWeight: fontWeight }]}
            >
                {children}
            </Text>        
    );
};

export default RedHatSBText;