import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CardItemCart from "../components/CardItemCart";
import { MotiText, MotiView } from "moti";

export default function Cart({ navigation }) {
    const { lmvCarrinhoLMV, adicionarAoCarrinhoLMV, removerDoCarrinhoLMV, limparCarrinhoLMV } = useContext(CartContext);
    const lmvTotalCarrinho = lmvCarrinhoLMV.reduce((total, item) => {
        return total + item.price * item.quantidade;
    }, 0);

    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            style={styles.container}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <MotiText
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: "timing", duration: 600 }}
                style={styles.titulo}
            >
                Carrinho
            </MotiText>

            <FlatList
                data={lmvCarrinhoLMV}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <MotiView
                        from={{ opacity: 0, translateX: -30 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: index * 100, type: "timing", duration: 400 }}
                    >
                        <CardItemCart
                            produto={item}
                            adicionar={adicionarAoCarrinhoLMV}
                            tirar={removerDoCarrinhoLMV}
                        />
                    </MotiView>
                )}
                contentContainerStyle={styles.containerCarrinho}
                ListFooterComponent={
                    lmvCarrinhoLMV.length > 0 && (
                        <MotiView
                            from={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "timing", duration: 500 }}
                        >
                            <View style={styles.containerPreco}>
                                <Text style={styles.tituloTotal}>Total</Text>
                                <Text style={styles.precoTotal}>R$ {lmvTotalCarrinho.toFixed(2)}</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.botao} onPress={limparCarrinhoLMV}>
                                    <Text style={styles.botaoTexto}>Excluir itens</Text>
                                </TouchableOpacity>
                            </View>

                        </MotiView>
                    )
                }
                ListEmptyComponent={
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 600 }}
                        style={{ alignItems: "center", marginTop: 40 }}
                    >

                        <Ionicons name="cart-outline" size={48} color="#ccc" />
                        <Text style={{ fontSize: 16, color: '#888', marginTop: 8 }}>
                            Seu carrinho está vazio ☕
                        </Text>
                        <Text style={{ fontSize: 14, color: '#aaa' }}>
                            Que tal adicionar um café delicioso?
                        </Text>

                    </MotiView>
                }
            />
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.fundo,
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.texto,
    },
    containerCarrinho: {
        backgroundColor: colors.branco,
        borderRadius: 20,
        padding: 15,
        marginRight: 10
    },
    containerPreco: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: colors.branco,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    tituloTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.texto,
    },
    precoTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    botao: {
        marginTop: 8,
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        textAlign: 'center',
    },
    botaoTexto: {
        color: colors.branco,
        fontWeight: 'bold',
    }

});
