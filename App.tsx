import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react"
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { ProdutoItem } from "./interfaces/ProdutoItem";

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);

  function adicionarProduto(nome: string) {
    const novoProduto: ProdutoItem = {
      id: Date.now().toString(),
      nome,
      comprado: false,
    };
    setProdutos((listaAtual) => [...listaAtual, novoProduto]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form onAdicionar={adicionarProduto} />
        <ListaItens />
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
