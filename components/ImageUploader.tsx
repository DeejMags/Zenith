import React from 'react';
import { Button, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader({ onImagePicked }: { onImagePicked: (uri: string) => void }) {
  const pickImage = async () => {
    // Use the new MediaType API to avoid deprecation warning
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Button title="Upload Image" onPress={pickImage} />
    </View>
  );
}
