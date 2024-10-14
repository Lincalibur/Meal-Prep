// ./MealPrepApp/database/databaseHelper.js
import { getDatabase, ref, set, get, child } from 'firebase/database'; // Import Firebase functions

const db = getDatabase(); // Initialize your database

// Function to process the scanned receipt image and update the inventory
export const processReceipt = async (imageUri) => {
  // Here, you would integrate a library to extract text from the image.
  // For this example, we'll simulate the data extracted from the receipt.
  
  const simulatedItems = [
    { name: 'Chicken', price: 12.99, category: 'Proteins' },
    { name: 'Broccoli', price: 2.49, category: 'Vegetables' },
    // Add more items as needed
  ];

  // Update inventory in the database
  for (const item of simulatedItems) {
    await updateInventory(item.name, item.price, item.category);
  }

  return simulatedItems; // Return the list of items processed
};

// Function to update the inventory
export const updateInventory = async (name, price, category) => {
  const itemRef = ref(db, 'inventory/' + name);
  const snapshot = await get(child(itemRef));

  if (snapshot.exists()) {
    // Item already exists, update the price
    await set(itemRef, { price: price, category: category });
  } else {
    // Item does not exist, add it
    await set(itemRef, { price: price, category: category });
  }
};
