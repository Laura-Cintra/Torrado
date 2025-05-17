import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import { CartContext } from "../context/CartContext";
import colors from "../theme/colors";
import CardItemCoffe from "../components/CardItemCoffe";
import produtosJson from '../data/produtos.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
    const [lmvBuscaLMV, setlmvBuscaLMV] = useState('')
    const [lmvProdutosLMV, setlmvProdutosLMV] = useState([])
    const { adicionarAoCarrinhoLMV } = useContext(CartContext)

    console.log(lmvProdutosLMV)

    // includes -> busca parcial | toLowerCase -> compara tudo com letra minuscula
    const produtosFiltrados = lmvBuscaLMV !== '' ? lmvProdutosLMV.filter(item => 
            item.name.toLowerCase().includes(lmvBuscaLMV.toLowerCase()) || 
      item.description.toLowerCase().includes(lmvBuscaLMV.toLowerCase())
        ) : lmvProdutosLMV
    

    useEffect(() => {
        async function carregarProdutos() {
            try {
                //  apagar o storage antigo
                // await AsyncStorage.removeItem('lmvProdutosLMV');

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
            <Text style={styles.titulo}>Bem-vindo ao Torrado!</Text>
            <View style={styles.containerSearch}>
                <Ionicons name="search" size={20} color={colors.branco} style={styles.searchIcon} />
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Buscar cafés ou descrições..."
                    placeholderTextColor={colors.cinzaEscuro}
                    value={lmvBuscaLMV}
                    onChangeText={setlmvBuscaLMV}
                />

            </View>
            <FlatList
                data={produtosFiltrados}
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
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: colors.marromClaro,
        borderRadius: "20px",
        paddingHorizontal: 12,
        marginBottom: 16,
        color: colors.texto
        // borderColor: colors.texto,
        // borderWidth: 1,
    },
    inputSearch: {
        flex: 1,
        marginLeft: 8,
        color: colors.branco,
        borderWidth: 0,
        height: '100%',
        outlineStyle: 'none'
    },
    lista: {
        paddingBottom: 100,
    },
});