import React, {Component} from 'react';
import { Modal, Text, View, TouchableHighlight, Image, ToastAndroid, TouchableOpacity, SafeAreaView, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/modals/ProductModalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';
// import RNFS from 'react-native-fs';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { launchImageLibrary } from 'react-native-image-picker';

export default class ProductModal extends Component {

  constructor(props) {
    super(props);
    this.onClose = this.props.onClose;
    this.onSaveProduct = this.props.onSave;
    this.state = {
        price: 0,
        color: null,
        type: null,
        presentation: null,
        isCameraModalOpen: false,
        photo: null,
    };
  }

  onClose() {
    this.onClose();
  }

  componentDidMount() {
    if (this.props.colors.length > 0) {
      this.setState({color: this.props.colors[0]});
    }

    if (this.props.types.length > 0) {
      if (this.state.type == null && this.props.survey.getSelectedType() != null) {
        this.setState({type: this.props.survey.getSelectedType()});
      } else {
        this.setState({type: this.props.types[0]});
      }
    }

    if (this.props.presentations.length > 0) {
      this.setState({presentation: this.props.presentations[0]});
    }
  }

  openCameraModal = () => {
    this.setState({ isCameraModalOpen: true });
  }

  closeCameraModal = () => {
    this.setState({ isCameraModalOpen: false });
    // console.log('Camera Closed');
  }

  takePicture = async () => {
    if (this.camera) {
        const options = { quality: 0.5, base64:false, width: 1000 };
        const data = await this.camera.takePictureAsync(options);
        this.setState({ photo: data.uri });
        this.setState({ isCameraModalOpen: false });
        // console.log(data.uri);
        Alert.alert(
          'Confirmación',
          'La evidencia se ha capturado con exito',
          [
            {text: 'OK', onPress: () => console.log('Evidencia Salvada')},
          ],
          {cancelable: false},
        );
      }
  };

  onSave() {
    this.onSaveProduct(this.state.price, this.state.color, this.state.type, this.state.presentation, this.state.photo);
  }
  
  render() {
    let colors = this.props.colors.map( (value, index) => {
      return <Picker.Item key={value.getId()} value={value} label={value.getName()} />
    });
    let types = this.props.types.map( (value, index) => {
      return <Picker.Item key={value.getId()} value={value} label={value.getName()} />
    });
    let presentations = this.props.presentations.map( (value, index) => {
      return <Picker.Item key={value.getId()} value={value} label={value.getName()} />
    });
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <View>
                <Text style={styles.label}>Color</Text>
                <Picker
                selectedValue={this.state.color}
                style={styles.pickerComponent}
                dropdownIconColor={'#ffffff'}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({color: itemValue})
                }>
                  {colors}
                </Picker>
            </View>
            <View>
                <Text style={styles.label}>Tipo de Distribuidor</Text>
                <Picker
                selectedValue={this.state.type}
                style={styles.pickerComponent}
                dropdownIconColor={'#ffffff'}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({type: itemValue})
                }>
                  {types}
                </Picker>
            </View>
            <View>
                <Text style={styles.label}>Presentación</Text>
                <Picker
                selectedValue={this.state.presentation}
                style={styles.pickerComponent}
                dropdownIconColor={'#ffffff'}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({presentation: itemValue})
                }>
                  {presentations}
                </Picker>
            </View>
            <View>
                <Text style={styles.label}>Precio</Text>
                <TextInput keyboardType="numeric" placeholder="$ precio MXN" textAlignVertical="top" style={styles.inputForm} multiline numberOfLines={1} onChangeText={(price) => {this.setState({price})}}></TextInput>
            </View>
            <View>
              <Text style={styles.subtitle}>Capturar Evidencia</Text>
              <TouchableHighlight style={styles.capture} underlayColor="#005ead" onPress={this.openCameraModal}>
                <View style={styles.button}>
                  <Icon style={styles.buttonIcon} name="camera" size={30} color="#fff" />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.externalButtonContainer}>
                <View style={styles.buttonsContainer}>
                    <TouchableHighlight underlayColor="#005ead" onPress={this.onClose.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#005ead" onPress={this.onSave.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
          </View>
        </Modal>
        <Modal
        visible={this.state.isCameraModalOpen}
        animationType="slide"
        onRequestClose={this.closeCameraModal}
        >
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              <View style={styles.buttonsCameraContainer}>
                {/* <TouchableHighlight underlayColor="transparent" onPress={this.closeCameraModal}>
                  <View style={styles.buttonCamera}>
                  </View>
                </TouchableHighlight> */}
                <TouchableHighlight underlayColor="transparent" onPress={this.takePicture}>
                    <View style={styles.buttonCamera}>
                    </View>
                </TouchableHighlight>
                {/* <TouchableHighlight underlayColor="transparent" onPress={this.launchImageLibrary}>
                  <View style={styles.buttonCamera}>
                  </View>
                </TouchableHighlight> */}
              </View>
            </RNCamera>
          </View>
        </Modal>
      </View>
    );
  }
}