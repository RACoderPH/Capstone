import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';

const JournalScreen = () => {
  const [entries, setEntries] = useState([]); // Store journal entries
  const [currentEntry, setCurrentEntry] = useState(''); // Store the current entry being edited
  const [selectedEntry, setSelectedEntry] = useState(null); // Track the selected journal entry
  const [isModalVisible, setModalVisible] = useState(false); // Control the visibility of the modal

  const addEntry = () => {
    if (currentEntry.trim() !== '') {
      setEntries([...entries, currentEntry]);
      setCurrentEntry('');
    }
  };

  const renderEntry = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleEntryPress(item)} style={styles.entryContainer}>
      <Text style={styles.entryText}>{item}</Text>
    </TouchableOpacity>
  );

  const handleEntryPress = (entry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write your journal entry..."
          value={currentEntry}
          onChangeText={(text) => setCurrentEntry(text)}
          multiline={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addEntry}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedEntry}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  addButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  entryContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  entryText: {
    fontSize: 16,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JournalScreen;
