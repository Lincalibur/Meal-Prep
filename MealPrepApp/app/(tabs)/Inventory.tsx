import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Inventory() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Inventory</ThemedText>
      <ThemedText>Check your available items here.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
