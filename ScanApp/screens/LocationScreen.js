import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import { CameraView, Camera } from 'expo-camera'; // ✅ Correct import for Expo SDK 53+

// This screen handles scanning a barcode to get the 'location' and passing it to the next screen
export default function LocationScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null); // Camera permission status
  const [scanned, setScanned] = useState(false); // Tracks if barcode has been scanned
  const [location, setLocation] = useState(''); // Holds scanned barcode data (location)
  const cameraRef = useRef(null); // Reference to the camera

  // Ask for camera permissions when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handler for when a barcode is scanned
  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return; // Prevent scanning again
    setScanned(true);
    setLocation(data); // Save scanned data
    Alert.alert('Scanned', `Location: ${data}`); // Show scanned value
  };

  // Handle unsupported platforms like web
  if (Platform.OS === 'web') {
    return <Text>Camera not supported on web</Text>;
  }

  // Show loading or permission error messages
  if (hasPermission === null) return <Text>Requesting permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={{ flex: 1 }}>
      {/* Show Camera if scanning is not yet done */}
      {!scanned && (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417', 'code128', 'code39'], // Supported barcode formats
          }}
        />
      )}

      {/* Show scanned result and navigation buttons after scan */}
      {scanned && (
        <>
          <Text style={styles.info}>Location Scanned: {location}</Text>

          {/* Navigate to Batch screen with scanned location */}
          <Button
            title="Go to Batch Screen"
            onPress={() => navigation.navigate('Batch', { location })}
          />

          {/* Button to rescan */}
          <View style={{ height: 10 }} />
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </>
      )}
    </View>
  );
}

// Styling for UI elements
const styles = StyleSheet.create({
  info: {
    fontSize: 18,
    marginVertical: 10,
    color: '#444',
  },
});
