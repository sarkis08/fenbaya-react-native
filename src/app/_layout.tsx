import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications"

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack>
      {/* Add your routes here */}
      <Stack.Screen
        name="(shop)"
        options={{ headerShown: false, title: "fenbaya" }}
      />
      <Stack.Screen
        name="categories"
        options={{ headerShown: false, title: "Categories" }}
      />
      <Stack.Screen
        name="product"
        options={{ headerShown: false, title: "Product" }}
      />
      <Stack.Screen
        name="cart"
        options={{ presentation: "modal", title: "Shopping Cart" }}
      />
      <Stack.Screen
        name="auth"
        options={{ headerShown: true }}
      />
    </Stack>
    </ToastProvider>
  );
}
