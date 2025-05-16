import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CartContext } from "../context/CartContext";
import { TextInput } from "react-native-web";
import colors from "../theme/colors";
import CardItemCoffe from "../components/CardItemCoffe";
import produtosJson from '../data/produtos.json'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const [lmvBuscaLMV, setlmvBuscaLMV] = useState('')
    const [lmvProdutosLMV, setlmvProdutosLMV] = useState([])
    const { adicionarAoCarrinhoLMV } = useContext(CartContext)


    useEffect(() => {
        async function carregarProdutos() {
            try {
                const dadosSalvos = await AsyncStorage.getItem('lmvProdutosLMV');
                if (dadosSalvos) {
                    setlmvProdutosLMV(JSON.parse(dadosSalvos));
                } else {
                    await AsyncStorage.setItem('lmvProdutosLMV', JSON.stringify(produtosJson));
                    setlmvProdutosLMV(produtosJson);
                }
            } catch (erro) {
                console.log('Erro ao carregar produtos:', erro);
            }
        }
        carregarProdutos();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem-vindo à Torrado!</Text>
            <TextInput
                style={styles.search}
                placeholder="Buscar cafés ou descrições..."
                placeholderTextColor={colors.cinzaClaro}
                value={lmvBuscaLMV}
                onChange={setlmvBuscaLMV}
            />
            <FlatList
                data={lmvProdutosLMV}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CardItemCoffe
                        produto={item}
                        aoAdicionar={() => adicionarAoCarrinhoLMV(item)}
                    />
                )}
                contentContainerStyle={styles.lista}

            />
        </View>
    )
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
    search: {
        backgroundColor: colors.branco,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderColor: colors.cinzaClaro,
        borderWidth: 1,
        color: colors.texto,
    },
    lista: {
        paddingBottom: 100,
    },
});