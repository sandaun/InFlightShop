import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
  return (
    <View style={styles.container}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
});

export default ProductList;
