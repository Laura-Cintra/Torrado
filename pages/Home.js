import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { CartContext } from "../context/CartContext";
import colors from "../theme/colors";
import CardItemCoffe from "../components/CardItemCoffe";
import SearchBar from "../components/SearchBar";
import produtosJson from "../data/produtos.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemModal from "../components/ItemModal";

export default function Home() {
  const [lmvBuscaLMV, setlmvBuscaLMV] = useState("");
  const [lmvProdutosLMV, setlmvProdutosLMV] = useState([]);
  const { adicionarAoCarrinhoLMV } = useContext(CartContext);

  console.log(lmvProdutosLMV);

  const [lmvModalVisivel, setlmvModalVisivel] = useState(false);
  const [lmvProdutoSelecionado, setlmvProdutoSelecionado] = useState(null);

  // includes -> busca parcial | toLowerCase -> compara tudo com letra minuscula
  const produtosFiltrados =
    lmvBuscaLMV !== ""
      ? lmvProdutosLMV.filter(
          (item) =>
          (item.name + " " + item.description)
          .toLowerCase()
          .includes(lmvBuscaLMV.toLowerCase())
        )
      : lmvProdutosLMV;

  useEffect(() => {
    async function carregarProdutos() {
      try {
        //  apagar o storage antigo
        // await AsyncStorage.removeItem('lmvProdutosLMV');

        const dadosSalvos = await AsyncStorage.getItem("lmvProdutosLMV");
        if (dadosSalvos) {
          setlmvProdutosLMV(JSON.parse(dadosSalvos));
        } else {
          await AsyncStorage.setItem(
            "lmvProdutosLMV",
            JSON.stringify(produtosJson)
          );
          setlmvProdutosLMV(produtosJson);
        }
      } catch (erro) {
        console.log("Erro ao carregar produtos:", erro);
      }
    }
    carregarProdutos();
  }, []);

  function abrirModal(produto) {
    setlmvProdutoSelecionado(produto);
    setlmvModalVisivel(true);
  }

  function fecharModal() {
    setlmvModalVisivel(false);
    setlmvProdutoSelecionado(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao Torrado!</Text>

      <SearchBar
        value={lmvBuscaLMV}
        onChangeText={setlmvBuscaLMV}
        placeholder="Buscar cafés ou descrições..."
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardItemCoffe
            produto={item}
            aoAdicionar={() => adicionarAoCarrinhoLMV(item)}
            aoPressionar={abrirModal}
          />
        )}
        contentContainerStyle={styles.lista}
      />

      <ItemModal
        visivel={lmvModalVisivel}
        produto={lmvProdutoSelecionado}
        onClose={fecharModal}
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
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.texto,
  },
  lista: {
    paddingBottom: 100,
  },
});
