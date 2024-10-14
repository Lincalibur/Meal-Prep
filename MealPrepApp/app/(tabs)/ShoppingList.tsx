import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function ShoppingList() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  // Function to add an item to the shopping list
  const addItem = () => {
    if (!itemName || !price) return;
    const newItem: ShoppingItem = {
      id: Math.random().toString(),
      name: itemName,
      quantity,
      price: parseFloat(price),
    };
    setShoppingList([...shoppingList, newItem]);
    setItemName('');
    setQuantity(1);
    setPrice('');
  };

  // Function to remove an item from the shopping list
  const removeItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Shopping List</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={String(quantity)}
        onChangeText={text => setQuantity(Number(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      
      <Button title="Add Item" onPress={addItem} />
      
      <FlatList
        data={shoppingList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</ThemedText>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    color: '#FFFFFF',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    color: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
