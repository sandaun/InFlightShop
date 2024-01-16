import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProductList from '../components/ProductList';
import {fetchProducts} from '../features/productsSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectProducts} from '../features/selectors';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/Navigation';
import {currencyOptions} from '../utils/constants';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [selectedPayOption, setSelectedPayOption] = useState(null);
  const [selectedCurrencyOption, setSelectedCurrencyOption] = useState(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalPrice = products.reduce(
    (sum, product) => sum + (product.quantity || 0) * product.price,
    0,
  );

  const handleNavigateToCheckout = () => {
    console.log('handleNavigateToCheckout');
    navigation.navigate('Checkout'); // Ensure 'Checkout' matches the name given in your navigation stack
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <Text>Products</Text> */}
        <ProductList products={products} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={handleNavigateToCheckout}>
            <Text style={styles.payButtonText}>
              Pay ${totalPrice.toFixed(2)}
            </Text>
          </TouchableOpacity>
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={value => setSelectedPayOption(value)}
              items={[
                {label: 'Retail', value: 'retail'},
                {label: 'Crew', value: 'crew'},
                {label: 'Happy Hour', value: 'happy_hour'},
              ]}
              style={pickerSelectStyles}
              value={selectedPayOption}
              placeholder={{label: 'Select an option', value: null}}
            />
          </View>
        </View>
        <View style={styles.currencyButton}>
          <RNPickerSelect
            onValueChange={value => setSelectedCurrencyOption(value)}
            items={currencyOptions}
            style={pickerSelectStyles}
            value={selectedCurrencyOption}
            placeholder={{label: 'Doiff', value: null}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // height: '70%',
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
});

// You can customize the styles for the picker
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

export default HomeScreen;
