import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [lmvCarrinhoLMV, setlmvCarrinhoLMV] = useState([]);

  const STORAGE_KEY = "lmvCarrinhoLMV";

  useEffect(() => {
    const carregarCarrinho = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setlmvCarrinhoLMV(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    };
    carregarCarrinho();
  }, []);

  useEffect(() => {
    const salvarCarrinho = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lmvCarrinhoLMV));
      } catch (error) {
        console.error("Erro ao salvar carrinho:", error);
      }
    };
    salvarCarrinho();
  }, [lmvCarrinhoLMV]);

  const adicionarAoCarrinhoLMV = (item) => {
    const itemExistente = lmvCarrinhoLMV.find((p) => p.id === item.id);
    if (itemExistente) {
      setlmvCarrinhoLMV((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, quantidade: p.quantidade + 1 } : p
        )
      );
    } else {
      setlmvCarrinhoLMV((prev) => [...prev, { ...item, quantidade: 1 }]);
    }
  };

  const removerDoCarrinhoLMV = (id) => {
    setlmvCarrinhoLMV((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const limparCarrinhoLMV = () => {
    setlmvCarrinhoLMV([]);
  };

  return (
    <CartContext.Provider
      value={{
        lmvCarrinhoLMV,
        adicionarAoCarrinhoLMV,
        removerDoCarrinhoLMV,
        limparCarrinhoLMV,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
