import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("rahul@example.com");
  const [password, setPassword] = useState("User@123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      setSubmitting(true);
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="headlineMedium">Tiffin Delivery</Text>
        <Text style={styles.subtitle}>Sign in to manage your monthly meals</Text>
        <TextInput label="Email" mode="outlined" value={email} onChangeText={setEmail} />
        <TextInput label="Password" mode="outlined" secureTextEntry value={password} onChangeText={setPassword} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button mode="contained" loading={submitting} onPress={handleLogin}>
          Login
        </Button>
        <Button onPress={() => navigation.navigate("Register")}>Create an account</Button>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff8f1",
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    gap: 14,
  },
  subtitle: {
    color: "#7a5c48",
  },
  error: {
    color: "#b3261e",
  },
});

export default LoginScreen;
