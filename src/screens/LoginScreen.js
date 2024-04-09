import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';

import LoadingModal from '../components/modals/LoadingModal';
import BaseScreen from './BaseScreen';
import Sync from '../net/Sync';
import styles from '../styles/screens/LoginScreenStyle';

export default class LoginScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showLoadingModal: false,
      showErrorMessage: false,
    }
  }

  componentDidMount() {
    this.getLoggedUser().then(function(user) {
      if (user != null) {
        this.setState({email: user.getEmail()});
        this.setState({password: user.getPassword()});
      }
    }.bind(this));
  }

  async onLogin() {
    this.setState({showLoadingModal: true});
    // Try to fetch users from server.
    let sync = new Sync();
    await sync.fetchUser(this.state.email.trim(), this.state.password, this.dao);
    let user = await this.dao.getUser(this.state.email.trim(), this.state.password);
    this.setState({showLoadingModal: false});
    this.setState({showErrorMessage: user == null});
    if (user != null) {
      await this.setLoggedUser(user);
      this.props.navigation.navigate("Menu", { user: user });
    }
  }

  renderLoadingModal() {
    if (this.state.showLoadingModal) {
      return <LoadingModal />
    }
    return <></>
  }

  renderErrorMessage() {
    if (this.state.showErrorMessage) {
      return <Text style={styles.errorText}>Las credenciales no son válidas</Text>
    }
    return <></>
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        <View>
          <Text style={styles.subtitle3}>Acceso v1.4</Text>
        </View>
        {this.renderLoadingModal()}
        <View style={styles.logo}>
          <Image source={require('../../assets/logosm.png')} />
        </View>
        <View>
          {this.renderErrorMessage()}
        </View>
        <View>
          <Text style={styles.subtitle}>Correo Electrónico</Text>
          <TextInput value={this.state.email} id="email" style={styles.inputForm} placeholder="Correo Electrónico" onChangeText={(email) => {this.setState({email})}} />
        </View>
        <View>
          <Text style={styles.subtitle}>Contraseña</Text>
          <TextInput value={this.state.password} secureTextEntry={true} id="password" style={styles.inputForm} placeholder="Contraseña" onChangeText={(password) => {this.setState({password})}} />
        </View>
        <View>
        <TouchableHighlight underlayColor="#005ead" style={styles.subtitle2} onPress={() => Linking.openURL('http://portal.pennsylvania.com.mx/auth/forgot_password')}>
              <Text style={styles.subtitle2}>¿Olvidó su contraseña?</Text>
        </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight underlayColor="#005ead" onPress={this.onLogin.bind(this)}>
            <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}