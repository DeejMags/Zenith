import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CameraButton from '@/components/CameraButton';
import ImageUploader from '@/components/ImageUploader';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';

// TODO: Replace with your real OCR/AI API key and endpoint
const AI_API_KEY = 'K87650323388957';
const AI_API_ENDPOINT = 'https://api.ocr.space/parse/image';

export default function HomeScreen() {
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [structured, setStructured] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handlePicture(uri: string) {
    setLoading(true);
    setAiResult(null);
    setStructured(null);
    setMetadata(null);
    setInsights(null);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'document.jpg',
        type: 'image/jpeg',
      } as any);
      const response = await fetch(AI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'apikey': AI_API_KEY,
        },
        body: formData,
      });
      const result = await response.json();
      // OCR.Space returns ParsedResults with ParsedText
      if (result.ParsedResults && result.ParsedResults.length > 0) {
        const text = result.ParsedResults.map((r: any) => r.ParsedText).join('\n');
        setAiResult('✅ Text extracted from image:');
        setStructured({ Text: text });
        setMetadata(result.ParsedResults[0]);
        setInsights(null);
      } else {
        setAiResult('❌ No text found in image. Please try again with a clearer document.');
      }
    } catch (e) {
      setAiResult('❌ Error connecting to AI service. Please try again.');
    }
    setLoading(false);
  }

  return (
    <View style={styles.background}>
      <View style={styles.headerSection}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
        <ThemedText type="title" style={styles.headerTitle}>Zenith</ThemedText>
        <ThemedText type="subtitle" style={styles.headerSubtitle}>
          Effortless Health Document Scanning
        </ThemedText>
      </View>
      <View style={styles.scanSection}>
        <CameraButton onPictureTaken={handlePicture} />
        <ImageUploader onImagePicked={handlePicture} />
        {loading && <Text style={styles.loadingText}>Analyzing document with AI...</Text>}
        {!loading && aiResult && (
          <ScrollView style={{ maxHeight: 320, width: '100%' }} contentContainerStyle={{ paddingBottom: 12 }}>
            <Text style={aiResult.startsWith('❌') ? styles.errorText : styles.aiResult}>{aiResult}</Text>
            {structured && (
              <View style={styles.resultBlock}>
                <Text style={styles.resultTitle}>Extracted Fields</Text>
                {Object.entries(structured).map(([key, value]) => (
                  <Text key={key} style={styles.resultField}><Text style={styles.resultKey}>{key}:</Text> {String(value)}</Text>
                ))}
              </View>
            )}
            {metadata && (
              <View style={styles.resultBlock}>
                <Text style={styles.resultTitle}>Metadata</Text>
                {Object.entries(metadata).map(([key, value]) => (
                  <Text key={key} style={styles.resultField}><Text style={styles.resultKey}>{key}:</Text> {JSON.stringify(value)}</Text>
                ))}
              </View>
            )}
            {insights && (
              <View style={styles.resultBlock}>
                <Text style={styles.resultTitle}>AI Insights</Text>
                <Text style={styles.resultField}>{typeof insights === 'string' ? insights : JSON.stringify(insights, null, 2)}</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
      <View style={styles.infoSection}>
        <ThemedText type="subtitle" style={styles.infoTitle}>How it works</ThemedText>
        <ThemedText style={styles.infoStep}>1. Tap Scan Document</ThemedText>
        <ThemedText style={styles.infoStep}>2. Take a clear photo of your health document</ThemedText>
        <ThemedText style={styles.infoStep}>3. Let AI extract your information</ThemedText>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 0,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 12,
    shadowColor: 'transparent',
  },
  reactLogo: {
    height: 64,
    width: 110,
    marginBottom: 8,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    marginTop: 6,
    color: '#687076',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  scanSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 8,
    padding: 28,
    alignItems: 'center',
    shadowColor: 'transparent',
  },
  loadingText: {
    marginTop: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aiResult: {
    marginTop: 16,
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 16,
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  resultBlock: {
    marginTop: 16,
    backgroundColor: '#F3F6FA',
    borderRadius: 10,
    padding: 12,
    width: '100%',
  },
  resultTitle: {
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
    fontSize: 15,
  },
  resultField: {
    fontSize: 14,
    color: '#222',
    marginBottom: 2,
  },
  resultKey: {
    fontWeight: 'bold',
    color: '#687076',
  },
  infoSection: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  infoStep: {
    fontSize: 15,
    color: '#687076',
    marginBottom: 2,
    textAlign: 'center',
  },
});
