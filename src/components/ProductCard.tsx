import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../app/hooks';
import {incrementQuantity} from '../features/productsSlice';
import {Product} from '../types/productTypes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.card}>
      <Image source={{uri: product.imageUrl}} style={styles.backgroundImage} />
      {product.quantity != null && product.quantity !== 0 ? (
        <View style={styles.quantityBadge}>
          <Text style={styles.textQuantity}>{product.quantity}</Text>
        </View>
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.subtitle}>{product.subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.priceTag}>
        <Text style={styles.priceText}>{`$${product.price}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.priceTag}
        onPress={() => dispatch(incrementQuantity(product.id))}>
        <Text style={styles.priceText}>{`$${product.price}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 170,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  quantityBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'blue',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQuantity: {
    color: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
  },
  priceTag: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    // alignSelf: 'flex-end',
    width: 55,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
  },
  priceText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ProductCard;
