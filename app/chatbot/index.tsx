import { View, Text } from 'react-native';

export default function ChatbotScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Hospital Chatbot</Text>
      {/* TODO: Add chat UI and connect to AI API */}
      <Text style={{ color: '#687076' }}>Chat with our AI assistant for health guidance and referrals.</Text>
    </View>
  );
}
