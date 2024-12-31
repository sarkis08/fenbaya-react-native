import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";

import { CATEGORIES } from "../../../assets/categories";
import { PRODUCTS } from "../../../assets/products";
import { ProductListItem } from "../../components/product-list-item";

const Category = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) return <Redirect href={"/404"} />;

  const products = PRODUCTS.filter((p) => p.category.slug === slug);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category.name }} />
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  // Add styles here
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 0,
  },
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    marginTop: 4,
    color: "#888",
  },
});
