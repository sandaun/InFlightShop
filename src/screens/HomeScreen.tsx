import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import ProductList from '../components/ProductList';
import {fetchProducts, setSelectedCurrency} from '../features/productsSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectProducts} from '../features/selectors';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/Navigation';
import {currencyOptions, payOptions} from '../utils/constants';
import {convertToMultipleCurrency} from '../utils/utils';
import {Picker} from '@react-native-picker/picker';
import {Currency} from '../types/utilsTypes';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [selectedPayOption, setSelectedPayOption] = useState(null);
  const [selectedCurrencyOption, setSelectedCurrencyOption] =
    useState<Currency>(Currency.EUR);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currencyConverted, setCurrencyConverted] = useState({});

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const totalPrice = products.reduce(
    (sum, product) => sum + (product.quantity || 0) * product.price,
    0,
  );

  const handleCurrencyConvert = useCallback(() => {
    const convert = convertToMultipleCurrency(
      totalPrice,
      selectedCurrencyOption,
    );
    setCurrencyConverted(convert);
  }, [totalPrice, selectedCurrencyOption]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    handleCurrencyConvert();
  }, [totalPrice, handleCurrencyConvert]);

  const handleNavigateToCheckout = () => {
    navigation.navigate('Checkout');
  };

  const formatConvertedCurrencies = () => {
    return Object.entries(currencyConverted)
      .map(([currency, value]) => `${value} ${currency}`)
      .join(' | ');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    handleCurrencyConvert();
    dispatch(setSelectedCurrency(selectedCurrencyOption));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductList products={products} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={[
              styles.payButton,
              totalPrice === 0 ? styles.payButtonDisabled : null,
            ]}
            onPress={handleNavigateToCheckout}
            disabled={totalPrice === 0}>
            <Text style={styles.payButtonText}>
              {`Pay ${totalPrice.toFixed(2)} ${selectedCurrencyOption}`}
            </Text>
          </TouchableOpacity>
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={value => setSelectedPayOption(value)}
              items={payOptions}
              style={pickerSelectStyles}
              value={selectedPayOption}
              placeholder={{label: 'Class', value: null}}
            />
          </View>
        </View>
        <View style={styles.currencyButton}>
          <TouchableOpacity style={styles.currencyButton} onPress={openModal}>
            <Text style={styles.currencyButtonText}>
              {formatConvertedCurrencies()}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainerStyle}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Edit product quantity</Text>
                <Picker
                  selectedValue={selectedCurrencyOption}
                  onValueChange={value => setSelectedCurrencyOption(value)}>
                  {currencyOptions.map(currency => (
                    <Picker.Item
                      key={currency}
                      label={currency}
                      value={currency}
                    />
                  ))}
                </Picker>
                <Button title="Confirm" onPress={closeModal} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 200,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: 'blue',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  payButtonDisabled: {
    backgroundColor: 'lightgray',
  },
  payButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  dropdownWrapper: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'navy',
    width: '45%',
  },
  currencyButton: {
    width: '100%',
    alignItems: 'center',
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
  currencyButtonText: {
    color: 'black',
    fontSize: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'red',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  inputAndroid: {
    color: 'red',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default HomeScreen;
