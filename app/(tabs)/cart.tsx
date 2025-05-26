import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';

export default function CartScreen() {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const renderCartItem = ({ item }) => <CartItem item={item} />;

  const handleCheckout = () => {
    alert('Your order will be processed. Implement payment here!');
  };

  if (cartItems.length === 0) {
    return (
      <EmptyState
        icon="shopping-bag"
        title="No items yet"
        message="Add your favorite items to start ordering"
        buttonText="Browse Store"
        buttonLink="/home"
      />
    );
  }

  const subtotal = getTotalPrice();
  const discount = 0.0; // For example purposes
  const total = subtotal - discount;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.sectionTitle}>🧾 Order Details</Text>

            <View style={styles.summaryCard}>
              <View style={styles.row}>
                <Text style={styles.label}>Items Total</Text>
                <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Shipping Fee</Text>
                <Text style={styles.value}>Free</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>You Saved</Text>
                <Text style={[styles.value, styles.saved]}>$0.00</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
              <Button
                title="Complete Checkout"
                onPress={handleCheckout}
                style={styles.checkoutBtn}
              />
              <Button
                title="Remove All Items"
                onPress={clearCart}
                style={styles.clearBtn}
                textStyle={styles.clearText}
              />
            </View>
          </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  footer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    color: '#64748b',
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0f172a',
  },
  saved: {
    color: '#16a34a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 14,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2563eb',
  },
  buttons: {
    gap: 12,
  },
  checkoutBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  clearBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  clearText: {
    color: '#475569',
    fontWeight: '500',
  },
});
