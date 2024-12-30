import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      {/* Add your routes here */}
      <Stack.Screen
        name="orders"
        options={{ headerShown: false, title: "Orders" }}
      />
    </Stack>
  );
}
