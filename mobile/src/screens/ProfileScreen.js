import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Chip, Text } from "react-native-paper";
import request from "../api/client";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = () => {
  const { user, token, logout } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (user && token) {
      request(`/subscriptions/user/${user.id}`, { token })
        .then((data) => setSubscriptions(data.data))
        .catch(console.error);
    }
  }, [user, token]);

  const activeSubscriptions = subscriptions.filter((item) => item.status === "ACTIVE");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text size={72} label={user?.name?.slice(0, 2).toUpperCase() || "TD"} />
          <Text variant="headlineSmall">{user?.name}</Text>
          <Text>{user?.email}</Text>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text variant="titleMedium">Active subscriptions</Text>
        {activeSubscriptions.length ? (
          activeSubscriptions.map((subscription) => (
            <Card key={subscription.id} style={styles.subscriptionCard}>
              <Card.Content>
                <Text variant="titleMedium">{subscription.service.name}</Text>
                <Text>{subscription.service.location}</Text>
                <Text>
                  {new Date(subscription.startDate).toLocaleDateString()} - {new Date(subscription.endDate).toLocaleDateString()}
                </Text>
                <Chip style={styles.chip}>{subscription.status}</Chip>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text>No active subscriptions yet.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium">Subscription history</Text>
        {subscriptions.map((subscription) => (
          <Card key={`history-${subscription.id}`} style={styles.subscriptionCard}>
            <Card.Content>
              <Text>{subscription.service.name}</Text>
              <Text>{subscription.status}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Button mode="outlined" onPress={logout}>
        Logout
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
  profileCard: {
    borderRadius: 22,
  },
  profileContent: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 18,
  },
  section: {
    gap: 12,
  },
  subscriptionCard: {
    borderRadius: 18,
  },
  chip: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
});

export default ProfileScreen;
