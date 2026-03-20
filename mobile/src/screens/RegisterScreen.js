import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    try {
      setSubmitting(true);
      setError("");
      await register(name, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="headlineSmall">Create account</Text>
        <TextInput label="Name" mode="outlined" value={name} onChangeText={setName} />
        <TextInput label="Email" mode="outlined" value={email} onChangeText={setEmail} />
        <TextInput label="Password" mode="outlined" secureTextEntry value={password} onChangeText={setPassword} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button mode="contained" loading={submitting} onPress={handleRegister}>
          Register
        </Button>
        <Button onPress={() => navigation.goBack()}>Back to login</Button>
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
  error: {
    color: "#b3261e",
  },
});

export default RegisterScreen;
