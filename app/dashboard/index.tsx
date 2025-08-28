import { View, Text } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>AI Analytics Dashboard</Text>
      {/* TODO: Add charts and analytics here */}
      <Text style={{ color: '#687076' }}>Charts and health data insights will appear here.</Text>
    </View>
  );
}
