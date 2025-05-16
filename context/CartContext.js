import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [lmvCarrinhoLMV, setlmvCarrinhoLMV] = useState([]);

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
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
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
