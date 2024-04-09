import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import BaseScreen from './BaseScreen';
import SurveyComment from '../entities/SurveyComment';
import BrandModal from '../components/modals/BrandModal';
import Utils from '../Utils';
import styles from '../styles/screens/BrandScreenStyle';

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
          <Image style={styles.brandImage} source={require('../../assets/trademark.png')} />
        </View>
        <View style={styles.itemContainerText}>
          <Text style={styles.itemText}>{object.getName()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class BrandScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
        brands: [],
        selected: null,
        showBrandModal: false,
        brandModalTitle: "",
        brandModalComment: "",
    }
    this.selectedDealer = this.props.navigation.getParam("dealer");
    this.surveyRef = this.props.navigation.getParam("survey");
  }

  componentDidMount() {
    this.filterData();
  }

  onNext() {
    if (this.state.selected != null) {
      this.props.navigation.navigate("Product", {dealer: this.selectedDealer, brand: this.state.selected, survey: this.surveyRef});
    } else {
      Alert.alert('Error!', 'Debe seleccionar una marca.',[{text: 'OK', onPress: () => console.log('OK Pressed')},], {cancelable: false},);
    }
  }

  onBack() {
    this.props.navigation.goBack();
  }

  async filterData() {
    let dbBrands = await this.dao.getBrands();
    var brands = [];
    for (let dbBrand of dbBrands) {
      brands.push(dbBrand);
    }
    this.setState({"brands": brands});
  }

  onSelect(object) {
    this.setState({selected: object});
  }

  async onAddComment() {
    if (this.state.selected != null) {
      let surveyComment = await this.dao.getSurveyComment(this.surveyRef, this.state.selected);
      this.setState({showBrandModal: true});
      this.setState({brandModalTitle: "Marca " + this.state.selected.getName()});
      if (surveyComment != null) {
        this.setState({brandModalComment: surveyComment.getComment()});
      } else {
        this.setState({brandModalComment: ""});
      }
    } else {
      Alert.alert('Error!', 'Debe seleccionar una marca.',[{text: 'OK', onPress: () => console.log('OK Pressed')},], {cancelable: false},);
    }
  }

  async onSaveBrandCommentModal(comment) {
    let surveyComment = new SurveyComment();
    surveyComment.setSurvey(this.surveyRef);
    surveyComment.setBrand(this.state.selected);
    surveyComment.setComment(comment);
    surveyComment.setActive(1);
    surveyComment.setDate(Utils.getCurrentDate());
    await this.dao.saveSurveyComment(surveyComment);
    this.onCloseBrandModal();
  }

  onCloseBrandModal() {
    this.setState({showBrandModal: false});
  }

  onInputBrandCommentModal(text) {
    this.setState({brandModalComment: text});
  }

  renderBrandCommentModal() {
    if (this.state.showBrandModal) {
      return <BrandModal onSave={this.onSaveBrandCommentModal.bind(this)} title={this.state.brandModalTitle} 
      comment={this.state.brandModalComment} 
      onInput={this.onInputBrandCommentModal.bind(this)} 
      onClose={this.onCloseBrandModal.bind(this)}/>;
    }
    return <></>
  }

  render() {
    const { brands } = this.state;
    return (
      <SafeAreaView style={styles.body}>
        {this.renderBrandCommentModal()}
        <View style={styles.containerFlex1}>
            <Text style={styles.title}>Marcas</Text>
            <Text style={styles.subtitle}>Selecciona una marca:</Text>
        </View>
        <View style={styles.containerFlex6}>
          <FlatList
            data={brands}
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
          <TouchableHighlight underlayColor="#005ead" onPress={this.onAddComment.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Agregar Comentario</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.containerFlex1}>
          <View style={styles.container}>
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