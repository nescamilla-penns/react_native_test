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
  Image,
} from 'react-native';

import BaseScreen from './BaseScreen';
import ProductModal from '../components/modals/ProductModal';
import SurveyProduct from '../entities/SurveyProduct';
import Utils from '../Utils';
import styles from '../styles/screens/ProductScreenStyle';

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
          <Image style={styles.productImage} source={require('../../assets/product.png')} />
        </View>
        <View style={styles.itemContainerText}>
          <Text style={styles.itemText}>{object.getName()}</Text>
          <Text style={styles.itemCapacityText}>{object.getCapacity()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class ProductScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
        products: [],
        selected: null,
        showProductModal: false,
        productModalTitle: "",
        productModalPrice: "",
    }
    this.selectedDealer = this.props.navigation.getParam("dealer");
    this.selectedBrand = this.props.navigation.getParam("brand");
    this.surveyRef = this.props.navigation.getParam("survey");
  }

  async componentDidMount() {
    this.filterData("");
    this.colors = await this.dao.getColors();
    this.types = await this.surveyRef.getDealerTypes();
    this.presentations = await this.dao.getPresentations();
  }

  onAddProduct() {
    if (this.state.selected != null) {
      this.setState({showProductModal: true});
      this.setState({productModalTitle: "Producto " + this.state.selected.getName()});
      this.setState({productModalPrice: ""});
    } else {
      Alert.alert('Error!', 'Debe seleccionar un producto.', [{text: 'OK', onPress: () => console.log('OK Pressed')},], {cancelable: false},);
    }
  }

  async onSaveProduct(price, color, type, presentation, photo) {
    this.surveyRef.setSelectedType(type);
    let surveyProduct = new SurveyProduct();
    surveyProduct.setSurvey(this.surveyRef);
    surveyProduct.setProduct(this.state.selected);
    surveyProduct.setColor(color);
    surveyProduct.setType(type);
    surveyProduct.setPrice(price);
    surveyProduct.setPresentation(presentation);
    surveyProduct.setPhoto(photo);
    surveyProduct.setActive(1);
    surveyProduct.setDate(Utils.getCurrentDate());
    await this.dao.saveSurveyProduct(surveyProduct);
    this.onCloseProductModal();
  }

  onCloseProductModal() {
    this.setState({showProductModal: false});
  }

  renderProductModal() {
    if (this.state.showProductModal) {
      return <ProductModal onSave={this.onSaveProduct.bind(this)} title={this.state.productModalTitle} 
      onClose={this.onCloseProductModal.bind(this)}
      colors={this.colors}
      types={this.types}
      presentations={this.presentations}
      survey={this.surveyRef} />;
    }
    return <></>
  }

  onViewProducts() {
    this.props.navigation.navigate("SurveyProduct", {survey: this.surveyRef, brand: this.selectedBrand});
  }

  onBack() {
    this.props.navigation.goBack();
  }

  async filterData(query) {
    let dbProducts = await this.dao.getByBrand(this.selectedBrand);
    var products = [];
    for (let dbProduct of dbProducts) {
        if (query == "") {
            products.push(dbProduct);
        } else {
            if (dbProduct.getName().toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                products.push(dbProduct);
            }
        }
    }
    this.setState({"products": products});
  }

  onText(text) {
    this.filterData(text);
  }

  onSelect(object) {
    this.setState({selected: object});
  }

  render() {
    const { products } = this.state;
    return (
      <SafeAreaView style={styles.body}>
        {this.renderProductModal()}
        <View>
          <Text style={styles.title}>Productos</Text>
        </View>
        <View style={styles.containerFlex1}>
            <TextInput id="product" style={styles.inputForm} placeholder="Buscar Producto" onChangeText={this.onText.bind(this)} />
        </View>
        <View>
          <Text style={styles.subtitle}>Selecciona un producto:</Text>
        </View>
        <View style={styles.containerFlex5}>
          <FlatList
            data={products}
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
          <TouchableHighlight underlayColor="#005ead" onPress={this.onAddProduct.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonAddText}>Agregar Producto</Text>
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
            <TouchableHighlight underlayColor="#005ead" onPress={this.onViewProducts.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Ver Lista</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}