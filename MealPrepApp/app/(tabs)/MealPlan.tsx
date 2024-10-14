import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MealPlan() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Meal Plan</ThemedText>
      <ThemedText>Today's meals: Breakfast, Lunch, Dinner</ThemedText>
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
