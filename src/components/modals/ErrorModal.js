import React, {Component} from 'react';
import {Modal, Text, View, TouchableHighlight} from 'react-native';
import styles from '../../styles/modals/ErrorModalStyle';

export default class ErrorModal extends Component {

  constructor(props) {
    super(props);
    this.onClose = this.props.onClose;
  }

  onClose() {
    this.onClose();
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Error</Text>
              <Text style={styles.title}>Las credenciales no son válidas</Text>
            </View>
            <View style={styles.externalButtonContainer}>
                <View style={styles.buttonsContainer}>
                    <TouchableHighlight underlayColor="#005ead" onPress={this.onClose.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Reintentar</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
          </View>
        </Modal>
    );
  }
}