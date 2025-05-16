import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CardItemCart from "../components/CardItemCart";

export default function Cart({ navigation }) {
    const { lmvCarrinhoLMV, adicionarAoCarrinhoLMV, removerDoCarrinhoLMV } = useContext(CartContext);

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
                        adicionar={adicionarAoCarrinhoLMV}
                        tirar={removerDoCarrinhoLMV}
                    />
                )}
                contentContainerStyle={styles.containerCarrinho}
                ListFooterComponent={
                    <View style={styles.containerPreco}>
                        <Text style={styles.tituloTotal}>Total</Text>
                        <Text style={styles.precoTotal}>R$ 50,00</Text>
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
    }
});
