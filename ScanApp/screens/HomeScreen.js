// HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, Alert, Modal, Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, Camera } from 'expo-camera';
import BatchTable from '../components/BatchTable';

// Dropdown options for levels
const LEVELS = ['Select Level', 'First', 'Second', 'Third'];

export default function HomeScreen() {
  // State variables
  const [location, setLocation] = useState('');         // Holds barcode/location input
  const [level, setLevel] = useState(LEVELS[0]);        // Currently selected level
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  const [batches, setBatches] = useState([]);           // List of added batch entries
  const [scannerVisible, setScannerVisible] = useState(false);   // Camera modal visibility
  const [hasPermission, setHasPermission] = useState(null);      // Camera permission status
  const [scanned, setScanned] = useState(false);        // Flag to prevent double scan

  const cameraRef = useRef(null); // Ref to access camera

  // Request camera permissions when component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Fetch previously saved batches from backend
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch('http://localhost:5000/scans');
        const data = await res.json();
        setBatches(data); // Set fetched batch data
      } catch (err) {
        console.error('Error fetching backend batches:', err);
      }
    };

    fetchBatches();
  }, []);

  // Handle barcode scan result
  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return; // Prevent double scan
    setScanned(true);
    setLocation(data);   // Set scanned barcode as location
    setScannerVisible(false);
    Alert.alert('Scanned', `Location: ${data}`);
  };

  // Add new batch to the list
  const handleAddBatch = () => {
    if (!location) {
      Alert.alert('Error', 'Please enter or scan a location.');
      return;
    }
    if (level === 'Select Level') {
      Alert.alert('Error', 'Please select a level.');
      return;
    }

    // Add new batch object to the list
    setBatches([...batches, { barcode: location, level }]);
    setLocation('');
    setLevel(LEVELS[0]);
  };

  // Delete batch from list by index
  const handleDeleteBatch = (idx) => {
    setBatches(batches.filter((_, i) => i !== idx));
  };

  // Save all batches to backend
  const handleSave = async () => {
    if (batches.length === 0) {
      Alert.alert('Error', 'No batches to save.');
      return;
    }

    try {
      for (const batch of batches) {
        await fetch('http://localhost:5000/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(batch),
        });
      }
      Alert.alert('Success', 'All batches saved!');
      setBatches([]); // Clear after saving
    } catch (e) {
      Alert.alert('Error', 'Failed to save batches.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>

      {/* Location input field with scan button */}
      <Text style={styles.label}>Location</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={location}
          placeholder="Enter or scan location"
          onChangeText={setLocation}
        />
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => {
            setScannerVisible(true);
            setScanned(false);
          }}
        >
          <MaterialIcons name="qr-code-scanner" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scanner camera modal */}
      <Modal visible={scannerVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          {/* Show camera if permissions are granted */}
          {Platform.OS === 'web' ? (
            <Text>Camera not supported on web</Text>
          ) : hasPermission === null ? (
            <Text>Requesting camera permission...</Text>
          ) : hasPermission === false ? (
            <Text>No access to camera</Text>
          ) : (
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              onBarcodeScanned={handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr', 'pdf417', 'code128', 'code39'],
              }}
            />
          )}

          {/* Close scanner button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 40,
              right: 20,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 20,
            }}
            onPress={() => setScannerVisible(false)}
          >
            <MaterialIcons name="close" size={28} color="#1976d2" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Dropdown for level selection */}
      <Text style={styles.label}>Level</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.dropdownBox, { flex: 1 }]}
          onPress={() => setDropdownVisible(!dropdownVisible)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.dropdownText,
              level === 'Select Level' && { color: '#aaa' },
            ]}
          >
            {level}
          </Text>
          <MaterialIcons
            name={dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color="#1976d2"
          />
        </TouchableOpacity>

        {/* Scan icon next to dropdown */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => {
            setScannerVisible(true);
            setScanned(false);
          }}
        >
          <MaterialIcons name="qr-code-scanner" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Dropdown options */}
      {dropdownVisible && (
        <View style={styles.dropdownList}>
          {LEVELS.filter(lvl => lvl !== 'Select Level').map(lvl => (
            <TouchableOpacity
              key={lvl}
              style={styles.dropdownItem}
              onPress={() => {
                setLevel(lvl);
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{lvl}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Add batch button */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAddBatch}>
        <Text style={styles.addBtnText}>ADD BATCHES +</Text>
      </TouchableOpacity>

      {/* Table displaying batch data */}
      <View style={styles.tableWrapper}>
        <BatchTable batches={batches} onDelete={handleDeleteBatch} />
      </View>

      {/* Save and Close buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setBatches([])}>
          <Text style={styles.closeBtnText}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for components
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8ff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#222' },
  label: { fontSize: 16, marginTop: 10, marginBottom: 4, color: '#222' },
  row: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#1976d2',
    backgroundColor: 'transparent',
    borderRadius: 6,
    padding: 10,
  },
  scanBtn: { marginLeft: 8, backgroundColor: '#1976d2', padding: 10, borderRadius: 6 },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginTop: 2,
    justifyContent: 'space-between',
  },
  dropdownText: { fontSize: 16, color: '#1976d2' },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 6,
    backgroundColor: 'transparent',
    marginBottom: 10,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItemText: { fontSize: 16, color: '#1976d2' },
  addBtn: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  tableWrapper: { height: 200, marginBottom: 30 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  saveBtn: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeBtn: {
    backgroundColor: '#757575',
    padding: 14,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

