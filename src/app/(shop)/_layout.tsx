import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "../../providers/auth-provider";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome {...props} size={24} style={{ color: "#1BC464" }} />;
}

const TabsLayout = () => {
  const { session, mounting } = useAuth()

  if(mounting) return <ActivityIndicator />
  if(!session) return <Redirect href="/auth" />

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1BC464",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          headerShown: false,
        }}
      >
        {/* Add your routes here */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Shop",
            tabBarIcon: (props) => (
              <TabBarIcon {...props} name="shopping-cart" />
            ),
          }}
        />
        <Tabs.Screen name="orders" options={{
            title: "Orders",
            tabBarIcon: (props) => (
              <TabBarIcon {...props} name="list-alt" />
            ),
  
        }} />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
