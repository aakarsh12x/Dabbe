import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Divider, List, Text } from "react-native-paper";
import request from "../api/client";
import { useAuth } from "../context/AuthContext";

const ServiceDetailScreen = ({ route }) => {
  const { serviceId } = route.params;
  const { token } = useAuth();
  const [service, setService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    request(`/services/${serviceId}`).then((data) => setService(data.data));
  }, [serviceId]);

  const subscribe = async () => {
    try {
      setSubmitting(true);
      setMessage("");
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await request("/subscriptions", {
        method: "POST",
        token,
        body: {
          serviceId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });

      setMessage("Subscription activated successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!service) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: service.imageUrl || "https://via.placeholder.com/800x500" }} />
        <Card.Content style={styles.cardContent}>
          <Text variant="headlineSmall">{service.name}</Text>
          <Text>{service.description}</Text>
          <View style={styles.metaRow}>
            <Chip>{service.vegOrNonVeg === "VEG" ? "Veg" : "Non-Veg"}</Chip>
            <Chip>{service.rating} ★</Chip>
            <Chip>{service.location}</Chip>
          </View>
          <Text style={styles.price}>Rs. {service.priceMonthly}/month</Text>
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      <Text variant="titleMedium">Sample Menu</Text>
      {service.menus?.map((menu) => (
        <List.Item key={menu.id} title={menu.day} description={menu.mealDescription} left={() => <List.Icon icon="silverware-fork-knife" />} />
      ))}

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Button mode="contained" loading={submitting} onPress={subscribe}>
        Subscribe monthly
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f1",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
  },
  cardContent: {
    paddingVertical: 16,
    gap: 12,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  divider: {
    marginVertical: 8,
  },
  price: {
    color: "#d35400",
    fontWeight: "700",
  },
  message: {
    color: "#0f8b55",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ServiceDetailScreen;
