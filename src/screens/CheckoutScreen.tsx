import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks'; // Ensure this is the correct path to your hook
import {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from '../features/productsSlice';
import RNPickerSelect from 'react-native-picker-select';
import {selectProducts} from '../features/selectors'; // Ensure this is the correct path to your selector
import {Product} from '../types/productTypes';
import {currencyOptions, paymentOptions} from '../utils/constants';

const CheckoutScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts).filter(
    item => item.quantity > 0,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedPayOption, setSelectedPayOption] = useState(null);

  const openModal = (id: string) => {
    setSelectedProductId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProductId(null);
  };

  const handleIncrementQuantity = () => {
    if (selectedProductId) {
      dispatch(incrementQuantity(selectedProductId));
    }
  };

  const handleDecrementQuantity = () => {
    if (selectedProductId) {
      dispatch(decrementQuantity(selectedProductId));
    }
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  const currentQuantity = selectedProductId
    ? products.find(product => product.id === selectedProductId)?.quantity || 0
    : 0;

  const totalPrice = products.reduce(
    (sum, product) => sum + (product.quantity || 0) * product.price,
    0,
  );

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{`${item.price} €`}</Text>
      <TouchableOpacity onPress={() => openModal(item.id)}>
        <Text>{item.quantity}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
        <Text>Remove</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item: Product) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainerStyle}>
          <View style={styles.modalView}>
            <View style={styles.quantityButtonsContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrementQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{currentQuantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.footer}>
        <View style={styles.footerFirstRow}>
          <View>
            <Text style={styles.footerItemTitle}>Asiento</Text>
            <RNPickerSelect
              onValueChange={value => setSelectedPayOption(value)}
              items={currencyOptions}
              style={pickerSelectStyles}
              value={selectedPayOption}
              placeholder={{label: 'Select an option', value: null}}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Text style={styles.footerItemTitle}>Total</Text>
            <Text style={styles.footerItemBody}>{totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderColor: 'lightgrey',
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    flex: 1,
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  quantityButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#919191',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 300,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  footerFirstRow: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  footerItemTitle: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'gray',
  },
  footerItemBody: {
    fontSize: 46,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // styles for iOS picker
    color: 'red',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  inputAndroid: {
    // styles for Android picker
  },
});

export default CheckoutScreen;
