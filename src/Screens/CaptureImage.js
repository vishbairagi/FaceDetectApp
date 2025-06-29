import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { users } from '../data/users';
import { matchFaces } from '../utils/faceCompare';

const CaptureImage = () => {
  const [img, setImg] = useState(null);
  const [matchedUser, setMatchedUser] = useState(null);

 const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      // Android 13+ needs READ_MEDIA_IMAGES
      const permissionsToRequest = Platform.Version >= 33
        ? [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES]
        : [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

      const alreadyGranted = await PermissionsAndroid.check(permissionsToRequest[0]);
      if (alreadyGranted) return true;

      const granted = await PermissionsAndroid.requestMultiple(permissionsToRequest);

      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      const isBlocked = Object.values(granted).some(
        (status) => status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      );

      if (isBlocked) {
        Alert.alert(
          'Permission Blocked',
          'Camera or gallery permission is permanently denied. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      return allGranted;
    } catch (error) {
      console.warn('Permission error:', error);
      return false;
    }
  }

  return true; // iOS auto handles permissions
};

  const handlePress = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    Alert.alert(
      'Choose an option',
      'Do you want to take a photo or choose from gallery?',
      [
        { text: 'Take Photo', onPress: handleCameraLaunch },
        { text: 'Choose from Gallery', onPress: openImagePicker },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openImagePicker = () => {
    const options = { mediaType: 'photo', includeBase64: false };
    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setImg(uri);
        checkFaceMatch(uri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = { mediaType: 'photo', includeBase64: false };
    launchCamera(options, (response) => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setImg(uri);
        checkFaceMatch(uri);
      }
    });
  };

  const checkFaceMatch = (selfieUri) => {
    let foundUser = null;
    for (const user of users) {
      if (matchFaces(user.image, { uri: selfieUri })) {
        foundUser = user;
        break;
      }
    }
    setMatchedUser(foundUser);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={img ? { uri: img } : require('../../assets/uploadimage.jpg')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Choose Image or Capture Image</Text>
      </TouchableOpacity>

      {matchedUser ? (
        <View style={styles.userCard}>
          <Image
            style={styles.userImage}
            source={
              typeof matchedUser.image === 'string'
                ? { uri: matchedUser.image }
                : matchedUser.image
            }
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{matchedUser.name}</Text>
            <Text style={styles.userThanks}>
              ✅ Match Found. Thank you for authentication!
            </Text>
          </View>
        </View>
      ) : (
        img && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>❌ No Match Found</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#22d3ee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 15,
  },
  resultBox: {
    marginTop: 30,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
    width: '90%',
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  userThanks: {
    marginTop: 8,
    fontSize: 14,
    color: 'green',
  },
});

export default CaptureImage;
