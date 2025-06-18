// BatchTable.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// BatchTable component displays the list of scanned batches in a table format
// Props:
// - batches: Array of batch objects [{ barcode, level }]
// - onDelete: Function to delete a batch by index
export default function BatchTable({ batches, onDelete }) {
  return (
    <View style={styles.tableContainer}>
      
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Batch</Text>
        <Text style={styles.headerCell}>Level</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>

      {/* FlatList to render each batch row */}
      <FlatList
        data={batches}
        keyExtractor={(_, idx) => idx.toString()} // Using index as key
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            {/* ID column */}
            <Text style={styles.cell}>{index + 1}</Text>

            {/* Batch column (barcode) */}
            <Text style={styles.cell}>{item.barcode}</Text>

            {/* Level column */}
            <Text style={styles.cell}>{item.level}</Text>

            {/* Delete button */}
            <TouchableOpacity style={styles.cellDelete} onPress={() => onDelete(index)}>
              <MaterialIcons name="delete" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Styles for the BatchTable component
const styles = StyleSheet.create({
  // Outer container with border and rounded corners
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 6,
    overflow: 'hidden',
  },

  // Header row styling (blue background)
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1976d2',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Each header cell (ID, Batch, Level, Action)
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Each data row
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    textAlign: 'center',
  },

  // Data cell (text in each column)
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    padding: 4,
  },

  // Delete icon cell with circular background
  cellDelete: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
    borderRadius: 50,
    marginLeft: 8,
  },
});
