import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "../../../assets/products";
import { useCartStore } from "../../store/cart-store";
import { Product } from "../../../assets/types/product";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toast = useToast();

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return <Redirect href={"/404"} />;

  const { items, addItem, incrementItem, decrementItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < product.maxQuantity) {
      incrementItem(product.id);
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast.show("Maximum quantity reached", {
        type: "warning",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      toast.show("Minimum quantity reached", {
        type: "warning",
        placement: "top",
        duration: 2000,
      });
      return;
    }

    decrementItem(product.id);
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image: product.heroImage,
    });
    toast.show(`${product.title} added to cart`, {
      type: "success",
      placement: "top",
      duration: 2000,
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />
      <View>
        <Image style={styles.heroImage} source={product.heroImage} />
        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <Image style={styles.image} source={item} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        />
      </View>

      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.slug}>{product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price: SLE {product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>Total Price: SLE {totalPrice}</Text>
        </View>
        <Text style={{ marginBottom: 1, fontWeight: "bold" }}>
          Description:
        </Text>
        <Text>{product.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecrement}
          disabled={quantity <= 1}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncrement}
          disabled={quantity >= product.maxQuantity}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            { opacity: quantity === 0 ? 0.5 : 1 },
          ]}
          onPress={handleAddToCart}
          disabled={quantity === 0}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },

  imagesContainer: {
    marginBottom: 0,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});
