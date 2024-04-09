import React, {Component} from 'react';
import {Modal, Text, View, TouchableHighlight} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/modals/BrandModalStyle';

export default class BrandModal extends Component {

  constructor(props) {
    super(props);
    this.onClose = this.props.onClose;
    this.onSaveComment = this.props.onSave;
    this.onInput = this.props.onInput;
  }

  onClose() {
    this.onClose();
  }

  onSave() {
    this.onSaveComment(this.props.comment);
  }

  onChangeText(text) {
    this.onInput(text);
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.subtitle}>Agrega un comentario:</Text>
            </View>
            <View>
                <TextInput value={this.props.comment} textAlignVertical="top" style={styles.inputForm} multiline numberOfLines={10} onChangeText={this.onChangeText.bind(this)}></TextInput>
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
    );
  }
}