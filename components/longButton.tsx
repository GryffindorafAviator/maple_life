import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const LongButton: React.FC<Props> = ({ icon, label, onPress, disabled=false }: Props) => {
    return (
        <Pressable 
            style={[styles.button, disabled && styles.buttonDisabled]} // Apply disabled style conditionally
            onPress={onPress}
            disabled={disabled}
        >
            <View style={styles.icon}>
                {icon}
            </View>
            <Text style={styles.label}>{label}</Text>
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
    buttonDisabled: {
        backgroundColor: 'rgba(173, 232, 244, 0.8)', // Change background color when disabled
    },
    icon: {
        marginRight: 10
    },
    label: {
        marginLeft: 10,
    }
})

export default LongButton;