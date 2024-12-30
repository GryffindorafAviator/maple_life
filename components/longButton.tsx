import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RedHatText from "./RedHatText";

type Props = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  fontFamily?: string;
  color?: string;
  labelColor?: string;
  buttonDisabledColor?: string;
  labelDisabledColor?: string;
};

const LongButton: React.FC<Props> = ({ icon, label, onPress, disabled=false, fontFamily, color='#0077b6', labelColor='#fff', buttonDisabledColor='rgba(173, 232, 244, 0.9)', labelDisabledColor='rgba(169, 169, 169, 1)' }: Props) => {
    return (
        <Pressable 
            style={[styles.button, { backgroundColor: color }, disabled && { backgroundColor: buttonDisabledColor}]} // Apply disabled style conditionally
            onPress={onPress}
            disabled={disabled}
        >
            <View style={styles.icon}>
                {icon}
            </View>
            <RedHatText 
                style={[styles.label, { fontFamily }]} // Apply disabled style conditionally
                textColor={disabled ? labelDisabledColor : labelColor}
            >
                {label}
            </RedHatText>
        </Pressable>
    );  
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 20,
        borderRadius: 10,
        width: '55%',
        backgroundColor: 'rgba(0, 119, 182, 0.8)', // Add background color
        alignSelf: 'center', // Center the button horizontally
        borderWidth: 0.2, // Add border width for visibility
        borderColor: '#ccc', // Add border color for visibility
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.3, // Shadow opacity for iOS
        shadowRadius: 4, // Shadow radius for iOS
        elevation: 5, // Elevation for Android
    },
    // buttonDisabled: {
    //     backgroundColor: 'rgba(173, 232, 244, 0.9)', // Change background color when disabled
    // },
    icon: {
        marginRight: 10,
        // color: 'rgba(255, 255, 255, 1)', // Set label text color to white in RGBA format
    },
    label: {
        marginLeft: 10,
    },
    // labelDisabled: {
    //     color: 'rgba(169, 169, 169, 1)', // Change text color when disabled (dark gray)
    // },
})

export default LongButton;