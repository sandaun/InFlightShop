import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Platform,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from '../features/productsSlice';
import {selectProducts} from '../features/selectors';
import {Product} from '../types/productTypes';
import {Picker} from '@react-native-picker/picker';

const CheckoutScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts).filter(
    item => item.quantity > 0,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSeatPickerModalVisible, setSeatPickerModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [selectedNumber, setSelectedNumber] = useState('1');

  const letters = Array.from({length: 11}, (_, i) =>
    String.fromCharCode(65 + i),
  );
  const numbers = Array.from({length: 50}, (_, i) => (i + 1).toString());

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
            <Text style={styles.modalTitle}>Edit product quantity</Text>
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
            <Button title="Confirm" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.footer}>
        <View style={styles.footerFirstRow}>
          <View>
            <Text style={styles.footerItemTitle}>Asiento</Text>
            <TouchableOpacity
              style={styles.seatButton}
              onPress={() => setSeatPickerModalVisible(true)}>
              <Text style={styles.seatText}>{selectedLetter}</Text>
              <Text style={styles.seatText}>{selectedNumber}</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isSeatPickerModalVisible}
            onRequestClose={() => setSeatPickerModalVisible(false)}>
            <View style={styles.modalContainerStyle}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Choose your seat</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={selectedLetter}
                    onValueChange={itemValue => setSelectedLetter(itemValue)}
                    style={styles.letterPicker}>
                    {letters.map(letter => (
                      <Picker.Item key={letter} label={letter} value={letter} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={selectedNumber}
                    onValueChange={itemValue => setSelectedNumber(itemValue)}
                    style={styles.numberPicker}>
                    {numbers.map(number => (
                      <Picker.Item key={number} label={number} value={number} />
                    ))}
                  </Picker>
                </View>
                <Button
                  title="Confirm"
                  onPress={() => setSeatPickerModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
          <View style={styles.footerItemTitleRight}>
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
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
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
  footerItemTitleRight: {
    alignItems: 'flex-end',
  },
  footerItemBody: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  seatButton: {
    width: 110,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatText: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    flexDirection: 'row',
  },
  letterPicker: {
    width: Platform.OS === 'android' ? 100 : undefined,
    flex: Platform.OS === 'ios' ? 1 : undefined,
  },
  numberPicker: {
    width: Platform.OS === 'android' ? 100 : undefined,
    flex: Platform.OS === 'ios' ? 1 : undefined,
  },
});

export default CheckoutScreen;
