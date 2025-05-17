import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { imagens } from "../assets/images";
import colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CardItemCart({ produto, adicionar, tirar }) {
    const { lmvCarrinhoLMV } = useContext(CartContext);
    const itemNoCarrinho = lmvCarrinhoLMV.find(p => p.id === produto.id);
    const lmvQuantidade = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
 
    return (
        <View style={styles.card}>
            <Image
                source={imagens[produto.image]}
                style={styles.imagem}
                resizeMode="contain"
            />
            <View style={styles.cardInfoCart}>
                <View style={styles.info}>
                    <Text style={styles.nome}>{produto.name}</Text>
                    <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>
                </View>
                <View style={styles.controleQuantidade}>
                    <TouchableOpacity onPress={() => tirar(produto.id)} style={styles.botao}>
                        <Ionicons name="remove" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.quantidade}>{lmvQuantidade || 1}</Text>
                    <TouchableOpacity onPress={() => adicionar(produto)} style={styles.botao}>
                        <Ionicons name="add" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.branco,
        marginRight: 10,
        padding: 12,
        marginBottom: 12,
        borderBottomColor: colors.marromClaro,
        borderBottomWidth: 0.5,
        elevation: 2,
    },
    imagem: {
        width: 60,
        height: 60,
        marginRight: 12,
    },
    cardInfoCart: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    controleQuantidade: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
    },
    botao: {
        padding: 6,
    },
    quantidade: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.texto,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.texto,
    },
    preco: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: 10,
    }
});
