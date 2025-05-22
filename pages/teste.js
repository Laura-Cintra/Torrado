import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CardItemCart from "../components/CardItemCart";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cart({ navigation }) {
    const { lmvCarrinhoLMV, adicionarAoCarrinhoLMV, removerDoCarrinhoLMV, limparCarrinhoLMV } = useContext(CartContext);
    const lmvTotalCarrinho = lmvCarrinhoLMV.reduce((total, item) => {
        return total + item.price * item.quantidade;
    }, 0);

    const atualizarCarrinhoNoAsyncStorage = async (novoCarrinho) => {
        try {
            await AsyncStorage.setItem('lmvCarrinhoLMV', JSON.stringify(novoCarrinho));
        } catch (erro) {
            console.log('Erro ao salvar carrinho no AsyncStorage:', erro);
        }
    };

    useEffect(() => {
        async function carregarCarrinho() {
            try {
                const dadosSalvos = await AsyncStorage.getItem('lmvCarrinhoLMV');
                if (dadosSalvos) {
                    const dados = JSON.parse(dadosSalvos);
                    adicionarAoCarrinhoLMV(dados);  
                }
            } catch (erro) {
                console.log('Erro ao carregar produtos no carrinho:', erro);
            }
        }
        carregarCarrinho();
    }, atualizarCarrinhoNoAsyncStorage());

    const handleAdicionarAoCarrinho = (item) => {
        adicionarAoCarrinhoLMV(item);
        atualizarCarrinhoNoAsyncStorage(lmvCarrinhoLMV);
    };

    const handleRemoverDoCarrinho = (itemId) => {
        removerDoCarrinhoLMV(itemId);
        atualizarCarrinhoNoAsyncStorage(lmvCarrinhoLMV);
    };

    const handleLimparCarrinho = () => {
        limparCarrinhoLMV();
        atualizarCarrinhoNoAsyncStorage([]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.titulo}>Carrinho</Text>

            <FlatList
                data={lmvCarrinhoLMV}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CardItemCart
                        produto={item}
                        adicionar={handleAdicionarAoCarrinho}
                        tirar={handleRemoverDoCarrinho}
                    />
                )}
                contentContainerStyle={styles.containerCarrinho}
                ListFooterComponent={
                    lmvCarrinhoLMV.length > 0 && (
                        <>
                            <View style={styles.containerPreco}>
                                <Text style={styles.tituloTotal}>Total</Text>
                                <Text style={styles.precoTotal}>R$ {lmvTotalCarrinho.toFixed(2)}</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.botao} onPress={handleLimparCarrinho}>
                                    <Text style={styles.botaoTexto}>Excluir itens</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Ionicons name="cart-outline" size={48} color="#ccc" />
                        <Text style={{ fontSize: 16, color: '#888', marginTop: 8 }}>
                            Seu carrinho está vazio ☕
                        </Text>
                        <Text style={{ fontSize: 14, color: '#aaa' }}>
                            Que tal adicionar um café delicioso?
                        </Text>
                    </View>
                }
            />
        </View>
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
