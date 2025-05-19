import { Modal, TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import { imagens } from "../assets/images";
import colors from "../theme/colors";

export default function ItemModal({ visivel, produto, onClose }) {
    if (!produto) return null;

    return (
        <Modal
            visible={visivel}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.conteudo}>
                    <Image
                        source={imagens[produto.image]}
                        style={styles.imagem}
                        resizeMode="contain"
                    />
                    <Text style={styles.nome}>{produto.name}</Text>
                    <Text style={styles.descricao}>{produto.description}</Text>
                    <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>

                    <TouchableOpacity style={styles.botao} onPress={onClose}>
                        <Text style={styles.botaoTexto}>Fechar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    conteudo: {
        backgroundColor: colors.branco,
        padding: 20,
        borderRadius: 12,
        width: "90%",
        alignItems: "center",
    },
    imagem: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    nome: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.texto,
        marginBottom: 8,
    },
    descricao: {
        fontSize: 16,
        color: colors.texto,
        marginBottom: 12,
        textAlign: "center",
    },
    preco: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 16,
    },
    botao: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    botaoTexto: {
        color: colors.branco,
        fontSize: 16,
    },
});
