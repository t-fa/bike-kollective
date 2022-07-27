import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import AddBikeForm from '../components/addBikeForm';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Camera } from 'expo-camera';
import { Platform } from 'expo-modules-core';
import { ourAuth } from '../../server';
let camera: Camera;

const AddBikeScreen: React.FC = () => {
  // Start and display camera view
  const [startCamera, setStartCamera] = React.useState(false);
  // Photo preview/Hide Camera
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  // Flash
  const [flashMode, setFlashMode] = React.useState('off');
  // Front/Back Camera
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );
  const [formData, setFormData] = React.useState({
    model: '',
    comments: '',
    issues: '',
    location: '',
    lockCombination: '',
    user: ourAuth.auth.currentUser?.uid,
    photo: capturedImage
  });

  // Update form
  const _updateForm = (
    data: React.SetStateAction<{
      model: string;
      comments: string;
      issues: string;
      location: string;
      lockCombination: string;
      user: string | undefined;
      photo: null;
    }>
  ) => {
    setFormData(data);
    setCapturedImage(data.photo);
  };
  // Start Camera
  const __startCamera = async () => {
    // Get permissions
    const { status } = await Camera.requestCameraPermissionsAsync();

    // If permissions start camera, else show error
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access Denied');
    }
  };

  // Called when camera button is pressed. Checks permissions, takes photo if granted.
  // Shows preview of photo and hides camera
  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync(); // take photo
    setPreviewVisible(true); // preview
    setCapturedImage(photo); // store
  };

  // Called when retake picture button is called. Clears preview and sets image to null
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  // Saves photo and close camera
  const __savePhoto = () => {
    setStartCamera(false);
  };

  // Handles flash
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  // Front/Back Camera
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  // Removes current saved photo
  const __clearImage = () => {
    if (capturedImage != null) {
      setCapturedImage(null);
    }
  };
  // https://github.com/necolas/react-native-web/issues/1589
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Platform.OS != 'web') {
          Keyboard.dismiss();
        }
      }}
    >
      <View style={styles.container}>
        {startCamera ? (
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview
                photo={capturedImage}
                savePhoto={__savePhoto}
                retakePicture={__retakePicture}
              />
            ) : (
              <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{ flex: 1 }}
                ref={(r) => {
                  camera = r;
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      flex: 1,
                      width: '100%',
                      padding: 20,
                      justifyContent: 'space-between'
                    }}
                  >
                    <View
                      style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__handleFlashMode}
                        style={{
                          position: 'absolute',
                          left: '5%',
                          top: '10%',
                          backgroundColor:
                            flashMode === 'off' ? '#000' : '#fff',
                          borderRadius: '50%',
                          height: 25,
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
                          }}
                        >
                          ⚡️
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={__switchCamera}
                        style={{
                          marginTop: 20,
                          height: 25,
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
                          }}
                        >
                          {cameraType === 'front' ? '↩️' : '↪️'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={styles.tile}>Add a Bike to Bike Kollective</Text>
            <AddBikeForm
              formData={formData}
              updateForm={_updateForm}
              bikePhotoUri={capturedImage}
            ></AddBikeForm>
            <TouchableOpacity
              onPress={__startCamera}
              style={styles.startCamera}
            >
              <Text style={styles.cameraText}>Add picture</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity>
                <Text style={styles.PhotoText}>
                  Photo: {capturedImage == null ? 'None' : 'Image.jpg'}
                </Text>
                <Text onPress={__clearImage} style={{}}>
                  {capturedImage != null ? '✖️' : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

// Previews Photo. Contains retake and save button options
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
  },
  tile: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: '#065C00'
  },
  startCamera: {
    marginTop: 10,
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  cameraText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 100,
    borderWidth: 2,
    borderColor: '#000000'
  },
  PhotoText: {
    fontSize: 17
  }
});

export default AddBikeScreen;
