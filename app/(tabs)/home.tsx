import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/utils/api';
import { Product } from '@/types';
import ErrorView from '@/components/ErrorView';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    try {
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Oops! Couldn’t load products. Try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Loading awesome stuff...</Text>
      </View>
    );
  }

  if (error && !refreshing) {
    return <ErrorView message={error} onRetry={loadProducts} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>🌟 Today's Picks</Text>
        <Text style={styles.subHeaderText}>Fresh styles just for you</Text>
        <View style={styles.divider} />
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>🚫 No items found. Check back soon!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: '#475569',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginTop: 12,
    marginBottom: 4,
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    padding: 30,
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
});
