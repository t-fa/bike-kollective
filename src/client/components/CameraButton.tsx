import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
let camera: Camera;

const CameraButton: React.FC = () => {
  // Manage state hook and display camera view
  const [startCamera, setStartCamera] = React.useState(false);

  // const cameraRef = React.useRef(null)

  // Start Camera
  const __startCamera = async () => {
    // Get permissions
    const { status } = await Camera.requestCameraPermissionsAsync();

    // If permissions start camera, else show error
    if (status === 'granted') {
      console.log(camera);
      setStartCamera(true);
      console.log('starting');
    } else {
      Alert.alert('Access Denied');
    }
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          style={{ flex: 1, width: '100%' }}
          ref={(r) => {
            camera = r;
          }}
        ></Camera>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Add picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CameraButton;
