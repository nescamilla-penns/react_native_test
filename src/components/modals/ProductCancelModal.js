import React, {Component} from 'react';
import {Modal, Text, View, TouchableHighlight, Alert} from 'react-native';
import styles from '../../styles/modals/ProductCancelModalStyle';

export default class ProductCancelModal extends Component {

  constructor(props) {
    super(props);
    this.onClose = this.props.onClose;
    this.onSave = this.props.onSave;
  }

  onClose() {
    this.onClose();
  }

  onSave() {
    if (this.onSave()) {
      Alert.alert(
        'Confirmación',
        'El producto se eliminó de la lista.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }    
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>¿Deseas cancelar el producto {this.props.title}?</Text>
            </View>
            <View style={styles.externalButtonContainer}>
                <View style={styles.buttonsContainer}>
                    <TouchableHighlight underlayColor="#005ead" onPress={this.onClose.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>No</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#005ead" onPress={this.onSave.bind(this)}>
                        <View style={styles.buttonCancel}>
                            <Text style={styles.buttonText}>Si</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
          </View>
        </Modal>
    );
  }
}