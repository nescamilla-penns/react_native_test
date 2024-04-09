import React, {Component} from 'react';
import {Modal, Text, Image, View} from 'react-native';
import * as Progress from 'react-native-progress';
import styles from '../../styles/modals/LoadingModalStyle';

export default class LoadingModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "Cargando"
    }
  }

  setText(str) {
    this.setState({text: str});
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}>
          <View style={styles.container}>
            <View style={styles.emptyElementContainer}></View>
            <View style={styles.elementContainer}>
              <Text style={styles.loadingText}>{this.state.text}</Text>
            </View>
            <View style={styles.elementContainer}>
              <Progress.Bar animated indeterminate color='#fff' progress={0.3} width={250} height={8} />
            </View>
            <View style={styles.emptyElementContainer}></View>
          </View>
        </Modal>
    );
  }
}