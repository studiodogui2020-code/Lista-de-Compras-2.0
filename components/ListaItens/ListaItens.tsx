import { CircleCheckBig, CircleDashed } from "lucide-react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { ProdutoItem } from "../../interfaces/ProdutoItem";
import ProdutoListaItem from "../ProdutoListaItem/ProdutoListaItem";
import { colors } from "../colors";

export const DATA: ProdutoItem[] = [
  { id: "1", nome: "Arroz (5kg)", comprado: true },
  { id: "2", nome: "Feijão Preto (1kg)", comprado: false },
  { id: "3", nome: "Macarrão Espaguete", comprado: true },
  { id: "4", nome: "Óleo de Soja", comprado: false },
  { id: "5", nome: "Açúcar Refinado", comprado: false },
];

type ListaItensProps = {
  produtos: ProdutoItem[];
  onAlternarComprado: (id: string) => void;
  onRemover: (id: string) => void;
  onLimpar: (comprados: boolean) => void;
};

export default function ListaItens({
  produtos,
  onAlternarComprado,
  onRemover,
  onLimpar,
}: ListaItensProps) {
  const [active, setActive] = useState("presentes");

  function alterarActiveParaPresentes() {
    setActive("presentes");
  }

  function alterarActiveParaComprados() {
    setActive("comprados");
  }

  const produtosFiltrados = produtos.filter((produto) =>
    active === "presentes" ? !produto.comprado : produto.comprado
  );

  return (
    <View style={styles.container}>
      {/* Filtro */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={alterarActiveParaPresentes}
        >
          <CircleDashed
            color={active === "presentes" ? colors.azul500 : colors.textSecondary}
          />
          <Text
            style={{
              color: active === "presentes" ? colors.azul500 : colors.textSecondary,
            }}
          >
            Presentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={alterarActiveParaComprados}
        >
          <CircleCheckBig
            color={active === "comprados" ? colors.azul500 : colors.textSecondary}
          />
          <Text
            style={{
              color: active === "comprados" ? colors.azul500 : colors.textSecondary,
            }}
          >
            Comprados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => onLimpar(active === "comprados")}
        >
          <Text style={{ color: colors.textSecondary }}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de itens */}
      <FlatList<ProdutoItem>
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(linha) => (
          <ProdutoListaItem
            produto={linha.item}
            onAlternarComprado={onAlternarComprado}
            onRemover={onRemover}
          />
        )}
      />
    </View>
  );
}