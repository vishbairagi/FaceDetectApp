import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('QRScanner'); // Navigate to QRScanner after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // 👈 Adjust path if logo is in src/assets/
        style={styles.logo}
        resizeMode="contain"
      />
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    backgroundColor:'blue'
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
});