import { Link, Stack } from "expo-router";
import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Link href="/">
        <Text style={styles.link}>
          Page not found. Go back to the Home page.
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#1E40AF', // nice blue
    textDecorationLine: 'underline',
  },
});
