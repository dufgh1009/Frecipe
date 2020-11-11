import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { saveImage } from '../redux/createRecipeSlice';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface State {
}
interface Props {
  navigation: any
  saveImage: typeof saveImage;
}

class MyCamera extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }
  camera: Camera | null = null;

  getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  }


  getCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }


  componentDidMount() {
    this.getCameraPermission()
    this.getCameraRollPermission()
  }

  takeSnapshot = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo != null) {
        MediaLibrary.saveToLibraryAsync(photo.uri)
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1
        });
        if (!result.cancelled) {
          this.props.saveImage(0, 'completeImage', result.uri)
          this.props.navigation.goBack()
        }
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }}
          ref={(camera) => {
            this.camera = camera
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [3, 3],
                  quality: 1
                });
                if (!result.cancelled) {
                  this.props.saveImage(0, 'completeImage', result.uri)
                  this.props.navigation.goBack()
                }
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Album </Text>
            </TouchableOpacity>
          </View>
          <Button onPress={() => this.takeSnapshot()} title="찰칵"></Button>
        </Camera>
      </View>
    );
  }

}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveImage: (index: number, category: string, uri: string) => dispatch(saveImage(index, category, uri)),
  };
};

export default connect(null, mapDispatchToProps)(MyCamera);