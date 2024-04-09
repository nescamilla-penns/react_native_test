import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import BaseScreen from './BaseScreen';
import moment from "moment"
import styles from '../styles/screens/SurveyScreenStyle';
import MonthSelectorCalendar from 'react-native-month-selector';
import 'moment/locale/es'

function Item({object, onSelect, state }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(object)}
      style={[
        styles.item,
        { backgroundColor: state.selected != null && state.selected.getId() == object.getId() ? styles.itemSelectedColor.backgroundColor : styles.itemUnselectedColor.backgroundColor },
        { borderColor: object.getIsSyncCompleted() ? styles.itemSyncBorderColor.borderColor : styles.itemUnsyncBorderColor.borderColor },
      ]}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerImage}>
          {object.getIsSyncCompleted() ? <Image style={styles.syncImage} source={require('../../assets/sync.png')} /> : <Image style={styles.syncImage} source={require('../../assets/unsync.png')} />}
        </View>
        <View style={styles.itemContainerText}>
        <Text style={styles.itemDateText}>ID {object.getId()}</Text>
          <Text style={styles.itemDateText}>{object.getDate()}</Text>
          <Text style={styles.itemText}>{object.getDealer().getName()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class SurveyScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
        surveys: [],
        selected: null,
        showMonthPicker: false,
        date: moment(),
    }
    // 2 seconds
    this.intervalTime = 2 * 1000;
    // Interval reference
    this.interval = 0;
  }

  componentDidMount() {
    this.filterData();
    this.interval = setInterval(() => {
      this.filterData();
    }, this.intervalTime);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onBack() {
    this.props.navigation.goBack();
  }

  async filterData() {
    let user = await this.getLoggedUser();
    let dbSurveys = [];
    if (user != null) {
      let date = this.state.date.format("YYYY-MM-01");
      console.log(date);
      dbSurveys = await this.dao.getSurveysByDate(date, user);
    }
    var surveys = [];
    for (let dbSurvey of dbSurveys) {
      surveys.push(dbSurvey);
    }
    this.setState({"surveys": surveys});
  }

  onSelect(object) {
    this.setState({selected: object});
    let date = this.state.date.format("YYYY-MM-01");
    this.props.navigation.navigate("Dealer", {survey: object, onRefreshSurveyScreen: this.filterData.bind(this), selectedDate: date});
  }

  onChangeDate(value) {
    this.setState({date: value, showMonthPicker: !this.state.showMonthPicker});
    this.filterData();
  }

  async onNewSurvey() {
    let date = moment().format("YYYY-MM-01");
    this.props.navigation.navigate("Dealer", {onRefreshSurveyScreen: this.filterData.bind(this), selectedDate: date});
  }

  onPickMonth() {
    this.setState({showMonthPicker: !this.state.showMonthPicker});
  }

  render() {
    const { surveys } = this.state;
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.containerFlex1}>
            <Text style={styles.title}>Formularios Competencia</Text>
        </View>
        <TouchableHighlight underlayColor="#005ead" onPress={this.onPickMonth.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{this.state.date.format("MMMM").toUpperCase()}</Text>
              </View>
        </TouchableHighlight>
        {this.state.showMonthPicker && <MonthSelectorCalendar
          selectedDate={this.state.date}
          onMonthTapped={this.onChangeDate.bind(this)} 
          nextText="Sig"
          prevText="Ant"
          localeLanguage="es"
          />
        }
        <View style={styles.containerFlex6}>
          <FlatList
            data={surveys}
            renderItem={({ item }) => (
              <Item
                state={this.state}
                object={item}
                onSelect={this.onSelect.bind(this)}
              />
            )}
            keyExtractor={item => item.getId()}
          />
        </View>
        <View style={styles.containerFlex1}>
          <View style={styles.container}>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onBack.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Regresar</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onNewSurvey.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonNewText}>Nueva</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}