import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { CameraView, CameraType, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function CameraButton({ onPictureTaken }: { onPictureTaken?: (uri: string) => void }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  React.useEffect(() => {
    (async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCameraOpen(false);
      onPictureTaken?.(photo.uri);
    }
  };

  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(true)} activeOpacity={0.85}>
        <View style={styles.iconCircle}>
          <Ionicons name="camera" size={32} color="#fff" />
        </View>
        <Text style={styles.buttonText}>Scan Document with AI</Text>
      </TouchableOpacity>
      <Modal visible={cameraOpen} animationType="slide">
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Ionicons name="camera" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setCameraOpen(false)}>
              <Ionicons name="close" size={36} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 32,
    alignSelf: 'center',
    marginVertical: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  iconCircle: {
    backgroundColor: '#0a7ea4',
    borderRadius: 32,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#0a7ea4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 24,
  },
  captureButton: {
    backgroundColor: '#007AFF',
    borderRadius: 32,
    padding: 16,
    marginRight: 16,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 32,
    padding: 16,
  },
});
