import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Platform } from 'react-native';

const BatchScreen = ({ route }) => {
  // Get the scanned location passed from LocationScreen
  const { location } = route.params || {};

  // State to hold list of all scans from the DB
  const [scans, setScans] = useState([]);

  // Define backend URL based on platform
  // 10.0.2.2 is used for Android emulator to access localhost
  const BACKEND_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

  // Run this effect only once when screen mounts
  useEffect(() => {
    fetchScans(); // Fetch all scanned data from DB
  }, []);

  // Function to fetch all scans from the backend
  const fetchScans = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/scans`);
      const data = await response.json();
      setScans(data); // Store in state
      console.log('Fetched scans:', data);
    } catch (error) {
      console.error('Failed to fetch scans:', error); // Log error if API fails
    }
  };

  // Function to save the current scanned location to backend DB
  const handleSaveToDB = async () => {
    if (!location) {
      Alert.alert('Error', 'No location to save.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.10:5000/scan', { // Replace with BACKEND_URL if consistent
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode: location }), // Send the scanned data
      });

      const result = await response.json();
      Alert.alert('Success', 'Location saved to database.');
      fetchScans(); // Refresh scan list
    } catch (error) {
      console.error('Error saving scan:', error);
      Alert.alert('Error', 'Could not save to server.'); // Show alert if failed
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Batch Screen</Text>

      {location ? (
        <>
          {/* Display scanned location and button to save it */}
          <Text style={styles.data}>Scanned Location: {location}</Text>
          <View style={{ marginVertical: 10 }}>
            <Button title="Save Location to Database" onPress={handleSaveToDB} />
          </View>
        </>
      ) : (
        <Text style={styles.data}>No data received</Text>
      )}

      {/* Show all previous scans from the database */}
      <Text style={styles.subTitle}>All Scans from DB:</Text>
      {scans.map((item, index) => (
        <View key={item._id || index} style={styles.scanItem}>
          <Text style={styles.scanText}>Barcode: {item.barcode}</Text>
          <Text style={styles.scanDate}>Scanned At: {new Date(item.scannedAt).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// Styles for the screen UI
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  data: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  scanItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f8ff',
  },
  scanText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scanDate: {
    fontSize: 13,
    color: '#666',
  },
});

export default BatchScreen;
