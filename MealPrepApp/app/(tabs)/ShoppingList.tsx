// ./MealPrepApp/app/(tabs)/ShoppingList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Import database from firebaseConfig

const ShoppingList = () => {
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const itemsRef = ref(database, 'inventory/');
    
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.keys(data).map(key => ({
          name: key,
          ...data[key],
        }));
        setItems(itemList);
        calculateTotal(itemList);
      }
    });

    return () => unsubscribe();
  }, []);

  const calculateTotal = (itemList: { price: number }[]) => {
    const total = itemList.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const renderItem = ({ item }: { item: { name: string; price: number } }) => (
    <Text style={styles.itemText} key={item.name}>
      {item.name}: ${item.price.toFixed(2)}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List:</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Text style={styles.totalText}>Total Estimated Price: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  itemText: {
    fontSize: 18,
    color: 'lightgrey',
  },
  totalText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
  },
});

export default ShoppingList;
