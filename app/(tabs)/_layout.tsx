import { Tabs } from 'expo-router';
import { ShoppingBag, Chrome as Home, ShoppingCart } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10b981', // Emerald green for active tab
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#111827' : '#f9fafb',
          borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 6,
        },
        headerStyle: {
          backgroundColor: isDark ? '#111827' : '#ffffff',
          borderBottomColor: isDark ? '#1f2937' : '#e5e7eb',
          shadowOpacity: 0.1,
        },
        headerTintColor: isDark ? '#f1f5f9' : '#111827',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: 'Discover Products',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
          headerTitle: 'Your Shopping Cart',
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
