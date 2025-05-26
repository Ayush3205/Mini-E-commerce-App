import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>
            {product.rating.rate.toFixed(1)} ({product.rating.count})
          </Text>
        </View>
        
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    backgroundColor: '#f1f5f9', // soft slate background for product image
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937', // dark slate text
    height: 40,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#6b7280', // cool gray
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981', // emerald green for pricing
  },
});

export default ProductCard;
