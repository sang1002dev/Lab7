import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Camera,
  PermissionsAndroid,
} from "react-native";

export default class Inputs extends Component {
  state = {
    camera: null,
    photo: null,
  };

  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
      (granted) => {
        if (granted) {
          this.setState({
            camera: Camera.get(),
          });
        }
      },
      (denied) => {
        console.log("Camera permission denied");
      },
    );
  }

  takePicture() {
    this.setState({
      photo: this.state.camera.capture(),
    });
  }

  render() {
    const { camera, photo } = this.state;

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={(ref) => this.state.camera = ref}
          onTakePicture={this.takePicture}
        />
        {photo && (
          <Text style={styles.photo}>
            {photo.toString()}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: 200,
    height: 200,
  },
  photo: {
    fontSize: 20,
  },
});
