import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProductCard from './ProductCard';
import {Product} from '../types/productTypes';

interface ProdcutListProps {
  products: Product[];
}

const ProductList: React.FC<ProdcutListProps> = ({products}) => {
  return (
    <View style={styles.container}>
      {products.map(product => (
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
