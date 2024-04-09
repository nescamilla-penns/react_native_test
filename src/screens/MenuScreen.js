import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import LoadingModal from '../components/modals/LoadingModal';
import BaseScreen from './BaseScreen';
import Sync from '../net/Sync';
import styles from '../styles/screens/MenuScreenStyle';

export default class MenuScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
        showLoadingModal: false,
        loggedUsername: "",
    }
    this.loadingModalRef = React.createRef();
  }

  async componentDidMount() {
    let user = await this.getLoggedUser();
    this.setState({loggedUsername: user.getName()});
  }

  async onLogout() {
    //await this.removeLoggedUser();
    this.props.navigation.navigate("Login");
  }

  async onSurvey() {
    this.props.navigation.navigate("Survey");
  }

  async onSyncSurveys() {
    this.setState({showLoadingModal: true});
    let sync = new Sync();
    await sync.sendData(this.dao);
    this.setState({showLoadingModal: false});

  }

  async onDropDatabase() {
    this.dao.dropDatabase();
  }

  async onSync() {
    this.setState({showLoadingModal: true});
    let sync = new Sync();
    await sync.fetchCatalogs(this.dao, function(value) {
      this.loadingModalRef.current.setText(value);
    }.bind(this));
    this.setState({showLoadingModal: false});
  }

  renderLoadingModal() {
    if (this.state.showLoadingModal) {
      return <LoadingModal ref={this.loadingModalRef} />;
    }
    return <></>
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        {this.renderLoadingModal()}
        <View style={styles.logo}>
          <Image source={require('../../assets/logosm.png')} />
        </View>
        <View>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>{this.state.loggedUsername}</Text>
        </View>
        <View>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onSurvey.bind(this)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Competencia</Text>
                </View>
            </TouchableHighlight>
        </View>
        <View>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onSync.bind(this)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Sincronizar Catálogos</Text>
                </View>
            </TouchableHighlight>
        </View>
        <View>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onSyncSurveys.bind(this)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Sincronizar Formularios</Text>
                </View>
            </TouchableHighlight>
        </View>
        <View>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onLogout.bind(this)}>
                <View style={styles.buttonLogout}>
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </View>
            </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}