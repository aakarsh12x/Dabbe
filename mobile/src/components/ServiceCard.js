import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

const ServiceCard = ({ service, onPress }) => (
  <Card style={styles.card}>
    <Card.Cover source={{ uri: service.imageUrl || "https://via.placeholder.com/600x400" }} />
    <Card.Content style={styles.content}>
      <View style={styles.headerRow}>
        <Text variant="titleMedium">{service.name}</Text>
        <Chip compact>{service.rating} ★</Chip>
      </View>
      <Text style={styles.location}>{service.location}</Text>
      <Text style={styles.price}>Rs. {service.priceMonthly}/month</Text>
      <View style={styles.tags}>
        <Chip compact>{service.vegOrNonVeg === "VEG" ? "Veg" : "Non-Veg"}</Chip>
      </View>
      <Button mode="contained" style={styles.button} onPress={onPress}>
        View details
      </Button>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    overflow: "hidden",
    borderRadius: 18,
  },
  content: {
    paddingVertical: 14,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    color: "#7a5c48",
  },
  price: {
    fontWeight: "700",
    color: "#d35400",
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default ServiceCard;
