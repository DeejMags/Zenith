import { View, Text } from 'react-native';

export default function QRScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>QR Prescriptions & Transfers</Text>
      {/* TODO: Add QR code generator and scanner */}
      <Text style={{ color: '#687076' }}>Generate and scan QR codes for prescriptions and patient transfers.</Text>
    </View>
  );
}
