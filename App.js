import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Ionicons } from '@expo/vector-icons';
import { CartContext, CartProvider } from './context/CartContext';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { lmvCarrinhoLMV } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#a0522d',
        tabBarInactiveTintColor: '#d3c4b7',
        tabBarStyle: { backgroundColor: '#f4ede4' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'cafe-outline';
          } else if (route.name === 'Carrinho') {
            iconName = 'cart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Carrinho"
        component={Cart}
        options={{
          tabBarBadge: lmvCarrinhoLMV.length > 0 ? lmvCarrinhoLMV.length : null,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#f4ede4" />
        <MainTabs />
      </NavigationContainer>
    </CartProvider>
  );
}
