import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
} from 'react-native';

import BaseScreen from './BaseScreen';
import Survey from '../entities/Survey';
import Utils from '../Utils';
import styles from '../styles/screens/DealerScreenStyle';
import MultiSelect from 'react-native-multiple-select';

function Item({object, onSelect, state }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(object)}
      style={[
        styles.item,
        { backgroundColor: state.selected != null && state.selected.getId() == object.getId() ? styles.itemSelectedColor.backgroundColor : styles.itemUnselectedColor.backgroundColor },
      ]}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerImage}>
          <Image style={styles.dealerImage} source={require('../../assets/dealer.png')} />
        </View>
        <View style={styles.itemContainerText}>
          <Text style={styles.itemText}>{object.getName()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class DealerScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
        dealers: [],
        selected: null,
        types: [],
        selectedTypes: [],
        isExclusive: false,
    }
    this.survey = new Survey();
    this.dealerName = "";
  }

  async componentDidMount() {
    if (this.props.navigation.getParam("survey") != null) {
      this.survey = this.props.navigation.getParam("survey");
      this.setState({selected: this.survey.getDealer()});
      this.setState({isExclusive: this.survey.getExclusive() == 1});
      this.filterData({dealer: this.survey.getDealer().getName(), types: this.survey.getSelectedTypes() });
    } else {
      this.filterData({dealer: "", types: []});
    }
    this.setState({types: await this.dao.getDealerTypes()});
  }

  async onNext() {
    if (this.state.selected == null) {
      Alert.alert(
        'Error!',
        'Debe seleccionar un distribuidor para continuar.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      // Save survey
      let user = await this.getLoggedUser();
      this.survey.setDealer(this.state.selected);
      this.survey.setExclusive(this.state.isExclusive ? 1 : 0);
      this.survey.setSelectedTypes(this.state.selectedTypes);
      this.survey.setSync(0);
      if (this.survey.getId() == 0) {
        this.survey.setUser(user);
        this.survey.setTime(Utils.getCurrentTime());
        this.survey.setDate(this.props.navigation.getParam("selectedDate"));
      }
      await this.dao.saveSurvey(this.survey);
      this.props.navigation.navigate("Brand", {dealer: this.state.selected, survey: this.survey});
    }
  }

  onBack() {
    this.props.navigation.getParam("onRefreshSurveyScreen")();
    this.props.navigation.goBack();
  }

  async filterData(query) {
    let dbDealers = await this.dao.getDealers();
    var dealers = [];
    for (let dbDealer of dbDealers) {
        if (dbDealer.matches(query.dealer, query.types)) {
          dealers.push(dbDealer);
        }
    }
    this.setState({"dealers": dealers});
  }

  onText(dealerName) {
    this.dealerName = dealerName;
    this.filterData({dealer: this.dealerName, types: this.state.selectedTypes });
  }

  onSelect(object) {
    this.setState({selected: object});
  }

  onIsExclusive(value) {
    this.setState({isExclusive: value});
  }

  onSelectedItemsChange(selected) {
    this.setState({selectedTypes: selected });
    this.filterData({dealer: this.dealerName, types: selected });
  }

  render() {
    const { dealers, types, selectedTypes } = this.state;
    return (
      <SafeAreaView style={styles.body}>
        <View>
          <Text style={styles.title}>Distribuidores</Text>
        </View>
        <View style={styles.containerFlex1}>
            <TextInput 
              id="dealer" 
              style={styles.inputForm} 
              onChangeText={this.onText.bind(this)} 
              placeholder="Distribuidores" 
            />
        </View>
        <View>
          <MultiSelect
              hideTags
              items={types}
              uniqueKey="id"
              onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
              selectedItems={selectedTypes}
              selectText="Tipos seleccionados"
              searchInputPlaceholderText="Encuentra el tipo de distribuidor ..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#CCC'}}
              submitButtonColor="#48d22b"
              submitButtonText="Seleccionar"
            />
        </View>
        <View>
          <Text style={styles.subtitle}>Selecciona un distribuidor:</Text>
        </View>
        <View style={styles.containerFlex6}>
          <FlatList
            data={dealers}
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
          <View style={styles.buttonsContainer}>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onBack.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Regresar</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onNext.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonNextText}>Siguiente</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}