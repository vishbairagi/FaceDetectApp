import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const QRScanner = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, []);

const handlePress = (btnName) => {
  if (btnName === 'View All Users') {
    navigation.navigate('ShowUserScreen');
  } else if (btnName === 'QR SCAN') {
    navigation.navigate('CaptureImage');
  } 
};


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('QR SCAN')}>
          <Text style={styles.buttonText}>QR SCAN</Text>
        </TouchableOpacity>

        

        <TouchableOpacity style={styles.button} onPress={() => handlePress('View All Users')}>
          <Text style={styles.buttonText}>View All Users</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark navy background
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#22d3ee', // Cyan color
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#0f172a',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});