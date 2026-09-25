import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { ProdutoItem } from "./interfaces/ProdutoItem";

const CHAVE_STORAGE = "@minha_lista_compras";

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      const json = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (json) {
        setProdutos(JSON.parse(json));
      }
    }
    carregarProdutos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(produtos));
  }, [produtos]);

  function adicionarProduto(nome: string) {
    const novoProduto: ProdutoItem = {
      id: Date.now().toString(),
      nome,
      comprado: false,
    };
    setProdutos((listaAtual) => [...listaAtual, novoProduto]);
  }

  function alternarComprado(id: string) {
    setProdutos((listaAtual) =>
      listaAtual.map((produto) =>
        produto.id === id ? { ...produto, comprado: !produto.comprado } : produto
      )
    );
  }

  function removerProduto(id: string) {
    setProdutos((listaAtual) =>
      listaAtual.filter((produto) => produto.id !== id)
    );
  }

  function limparItens(comprados: boolean) {
    setProdutos((listaAtual) =>
      listaAtual.filter((produto) => produto.comprado !== comprados)
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form onAdicionar={adicionarProduto} />
        <ListaItens
          produtos={produtos}
          onAlternarComprado={alternarComprado}
          onRemover={removerProduto}
          onLimpar={limparItens}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});