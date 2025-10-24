import React from 'react';
import { Text, View } from 'react-native';

const SettingsScreen = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold">Settings</Text>
      <Text className="mt-4">Configure your AI app settings here.</Text>
    </View>
  );
};

export default SettingsScreen;