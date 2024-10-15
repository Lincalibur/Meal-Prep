// ./MealPrepApp/components/ScanReceipt.tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { processReceipt } from './database/databaseHelper'; // Correct import path

const ScanReceipt: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      setMessage('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets?.[0]?.uri ?? null);
      const updatedItems = await processReceipt(result.assets?.[0]?.uri);
      setMessage(updatedItems.length > 0 ? 'Receipt processed successfully!' : 'No items found.');
    }
  };

  return (
    <View>
      <Button title="Scan Receipt" onPress={pickImage} />
      {imageUri && <Text>Image URI: {imageUri}</Text>}
      {message && <Text>{message}</Text>}
    </View>
  );
};

export default ScanReceipt;
