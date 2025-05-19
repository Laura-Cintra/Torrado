import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { imagens } from '../assets/images';

export default function CardItemCoffe({ produto, aoAdicionar, aoPressionar}) {

    return (
        <TouchableOpacity onPress={() => aoPressionar(produto)}>
            <View style={styles.card}>
                <Image
                    source={imagens[produto.image]}
                    style={styles.imagem}
                    resizeMode="contain"
                />
                <View style={styles.info}>
                    <Text style={styles.nome}>{produto.name}</Text>
                    <Text style={styles.descricao}>{produto.description}</Text>
                    <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.botao} onPress={aoAdicionar}>
                        <Text style={styles.botaoTexto}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.branco,
        marginRight: 10,
        overflow: 'hidden',
        borderRadius: 20,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    imagem: {
        width: 70,
        height: 70,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.texto,
    },
    descricao: {
        color: colors.cinza,
        fontSize: 14,
    },
    preco: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        marginTop: 4,
    },
    botao: {
        marginTop: 8,
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoTexto: {
        color: colors.branco,
        fontWeight: 'bold',
    },
});
