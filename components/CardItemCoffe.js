import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { imagens } from '../assets/images';


export default function CardItemCoffe({produto, aoAdicionar}) {
    return (
        <View style={styles.card}>
            <Image
                source={imagens[produto.imagem]}
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
    );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.branco,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagem: {
    width: 80,
    height: 80,
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
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: {
    color: colors.branco,
    fontWeight: 'bold',
  },
});
