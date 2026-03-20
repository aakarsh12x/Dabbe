import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import request from "../api/client";
import ServiceCard from "../components/ServiceCard";

const HomeScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchServices = useCallback(async () => {
    const data = await request("/services");
    setServices(data.data);
  }, []);

  useEffect(() => {
    fetchServices()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchServices]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchServices();
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={services}
      keyExtractor={(item) => String(item.id)}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <ServiceCard service={item} onPress={() => navigation.navigate("ServiceDetail", { serviceId: item.id })} />
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text variant="headlineSmall">Fresh tiffins near you</Text>
          <Text style={styles.subtitle}>Discover monthly meal plans from trusted home chefs.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f1",
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
    gap: 4,
  },
  subtitle: {
    color: "#7a5c48",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
