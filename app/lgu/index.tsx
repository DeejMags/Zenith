import { View, Text } from 'react-native';

export default function LGUDashboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>LGU Health Dashboard</Text>
      {/* TODO: Add public health analytics and insights */}
      <Text style={{ color: '#687076' }}>LGU officials can view public health trends and insights here.</Text>
    </View>
  );
}
