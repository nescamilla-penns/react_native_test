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
import ProductCancelModal from '../components/modals/ProductCancelModal';
import styles from '../styles/screens/SurveyProductScreenStyle';

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
          <Text style={styles.itemText}>{object.getProduct().getName()}</Text>
          <Text style={styles.itemText}>{object.getProduct().getCapacity()}</Text>
          <Text style={styles.itemText}>Color: {object.getColor().getName()}</Text>
          <Text style={styles.itemText}>Presentación: {object.getPresentation().getName()}</Text>
          <Text style={styles.itemText}>Precio: {object.getPrice()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class SurveyProductScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.state = {
        products: [],
        selected: null,
        showModal: false,
        modalTitle: "",
    }
    this.selectedBrand = this.props.navigation.getParam("brand");
    this.surveyRef = this.props.navigation.getParam("survey");
  }

  componentDidMount() {
    this.filterData();
  }

  onBack() {
    this.props.navigation.goBack();
  }

  async filterData() {
    let dbProducts = await this.dao.getSurveyProducts(this.surveyRef, this.selectedBrand);
    var products = [];
    for (let dbProduct of dbProducts) {
        products.push(dbProduct);
    }
    this.setState({"products": products});
  }

  onSelect(object) {
    this.setState({selected: object});
  }

  async onCancelProduct() {
    if (this.state.selected != null) {
      this.setState({showModal: true});
      this.setState({modalTitle: this.state.selected.getProduct().getName()});
    } else {
      Alert.alert('Error!', 'Debe seleccionar un producto.', [{text: 'OK', onPress: () => console.log('OK Pressed')},], {cancelable: false},);
    }
  }

  async onSaveModal() {
    await this.dao.deactiveSurveyProduct(this.state.selected);
    this.filterData();
    this.onCloseModal();
  }

  onCloseModal() {
    this.setState({showModal: false});
  }

  renderModal() {
    if (this.state.showModal) {
      return <ProductCancelModal onSave={this.onSaveModal.bind(this)} title={this.state.modalTitle} 
      onClose={this.onCloseModal.bind(this)}/>;
    }
    return <></>
  }

  render() {
    const { products } = this.state;
    return (
      <SafeAreaView style={styles.body}>
        {this.renderModal()}
        <View style={styles.containerFlex1}>
            <Text style={styles.title}>Productos Agregados</Text>
        </View>
        <View style={styles.containerFlex6}>
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
          <View style={styles.container}>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onBack.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Regresar</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#005ead" onPress={this.onCancelProduct.bind(this)}>
              <View style={styles.buttonCancel}>
                <Text style={styles.buttonText}>Cancelar Producto</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}