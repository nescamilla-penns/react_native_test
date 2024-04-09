import React, { Component } from 'react';
import DAOFacade from "../model/DAOFacade";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class BaseScreen extends Component {

  constructor(props) {
    super(props);
    this.dao = DAOFacade.getInstance();
  }

  async setLoggedUser(user) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  }

  async removeLoggedUser() {
      await AsyncStorage.removeItem("user")
  }

  async getLoggedUser() {
    let user = await AsyncStorage.getItem("user");
    let parsedUser = JSON.parse(user);
    if (parsedUser != null) {
      let userObj = await this.dao.getUserById(parsedUser.id);
      return userObj;
    }
    return null;
  }

  async isLogged() {
    let user = await this.getLoggedUser();
    return user != null;
  }
}