import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

const categories = [
  'Proteins',
  'Vegetables',
  'Dairy',
  'Pantry/Other',
  'Spices',
];

export default function FoodItems() {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [foodList, setFoodList] = useState<FoodItem[]>([]);

  const addFoodItem = () => {
    if (!foodName || !foodPrice) return;
    const newFoodItem: FoodItem = {
      id: Math.random().toString(),
      name: foodName,
      price: parseFloat(foodPrice),
      category,
    };
    setFoodList([...foodList, newFoodItem]);
    setFoodName('');
    setFoodPrice('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titleText}>Food Items</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Food Item Name"
        value={foodName}
        onChangeText={setFoodName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (R/kg or R/unit)"
        keyboardType="numeric"
        value={foodPrice}
        onChangeText={setFoodPrice}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      
      <Button title="Add Food Item" onPress={addFoodItem} />
      
      <FlatList
        data={foodList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText style={styles.foodItemText}>
              {item.name} - ${item.price.toFixed(2)} ({item.category})
            </ThemedText>
          </ThemedView>
        )}
        ListHeaderComponent={() => (
          <>
            {categories.map(cat => (
              <View key={cat}>
                <ThemedText type="subtitle" style={styles.categoryText}>{cat}</ThemedText>
                <FlatList
                  data={foodList.filter(item => item.category === cat)}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <ThemedView style={styles.item}>
                      <ThemedText style={styles.foodItemText}>
                        {item.name} - ${item.price.toFixed(2)}
                      </ThemedText>
                    </ThemedView>
                  )}
                />
              </View>
            ))}
          </>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E', // Dark background for better contrast
  },
  titleText: {
    color: '#FFFFFF', // Lighter color for the title
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    color: '#FFFFFF', // Change text color in input fields
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 8,
  },
  item: {
    marginBottom: 8,
  },
  foodItemText: {
    color: '#FFFFFF', // Lighter color for food item text
  },
  categoryText: {
    color: '#FFFFFF', // Lighter color for category titles
    fontWeight: 'bold',
    marginTop: 8,
  },
});
