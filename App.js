import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Ionicons } from '@expo/vector-icons';
import { CartContext, CartProvider } from './context/CartContext';
import { StatusBar } from 'expo-status-bar';
import colors from './theme/colors';

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { lmvCarrinhoLMV } = useContext(CartContext);
  const totalItens = lmvCarrinhoLMV.reduce((total, item) => total + item.quantidade, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.cinzaClaro,
        tabBarStyle: { backgroundColor: colors.fundo },
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
          tabBarBadge: lmvCarrinhoLMV.length > 0 ? totalItens : null,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor={colors.fundo} />
        <MainTabs />
      </NavigationContainer>
    </CartProvider>
  );
}
