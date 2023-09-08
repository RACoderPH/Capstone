import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';

const { width } = Dimensions.get('window');

const TestScreen = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View>
        <View >
        <Text style={{ fontSize: width * 0.04, display: 'flex', flexWrap: 'wrap', color: 'black', marginTop: width * 0.04 }}>
      I found myself getting upset by quite trivial things
    </Text>
    <View>
      <Text style={{ fontSize: width * 0.039, color: 'black' }}>Choices:</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={0}
            status={selectedValue === 0 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(0)}
          />
          <Text>0</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={1}
            status={selectedValue === 1 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(1)}
          />
          <Text>1</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={2}
            status={selectedValue === 2 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(2)}
          />
          <Text>2</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={3}
            status={selectedValue === 3 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(3)}
          />
          <Text>3</Text>
        </View>
      </View>
    </View>
    <Text>Selected Value: {selectedValue}</Text>
        </View>

        <View >
        <Text style={{ fontSize: width * 0.04, display: 'flex', flexWrap: 'wrap', color: 'black', marginTop: width * 0.04 }}>
      I found myself getting upset by quite trivial things
    </Text>
    <View>
      <Text style={{ fontSize: width * 0.039, color: 'black' }}>Choices:</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={0}
            status={selectedValue === 0 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(0)}
          />
          <Text>0</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={1}
            status={selectedValue === 1 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(1)}
          />
          <Text>1</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={2}
            status={selectedValue === 2 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(2)}
          />
          <Text>2</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={3}
            status={selectedValue === 3 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(3)}
          />
          <Text>3</Text>
        </View>
      </View>
    </View>
    <Text>Selected Value: {selectedValue}</Text>
        </View>

        <View >
        <Text style={{ fontSize: width * 0.04, display: 'flex', flexWrap: 'wrap', color: 'black', marginTop: width * 0.04 }}>
      I found myself getting upset by quite trivial things
    </Text>
    <View>
      <Text style={{ fontSize: width * 0.039, color: 'black' }}>Choices:</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={0}
            status={selectedValue === 0 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(0)}
          />
          <Text>0</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={1}
            status={selectedValue === 1 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(1)}
          />
          <Text>1</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={2}
            status={selectedValue === 2 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(2)}
          />
          <Text>2</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={3}
            status={selectedValue === 3 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(3)}
          />
          <Text>3</Text>
        </View>
      </View>
    </View>
    <Text>Selected Value: {selectedValue}</Text>
        </View>
        <View >
        <Text style={{ fontSize: width * 0.04, display: 'flex', flexWrap: 'wrap', color: 'black', marginTop: width * 0.04 }}>
      I found myself getting upset by quite trivial things
    </Text>
    <View>
      <Text style={{ fontSize: width * 0.039, color: 'black' }}>Choices:</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={0}
            status={selectedValue === 0 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(0)}
          />
          <Text>0</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={1}
            status={selectedValue === 1 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(1)}
          />
          <Text>1</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={2}
            status={selectedValue === 2 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(2)}
          />
          <Text>2</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={3}
            status={selectedValue === 3 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(3)}
          />
          <Text>3</Text>
        </View>
      </View>
    </View>
    <Text>Selected Value: {selectedValue}</Text>
        </View>
        
  </View>
);
};

const styles = StyleSheet.create({
  radioGroup: {
    width: width * 1,
    marginTop: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
  },
  radioOption: {
    alignItems: 'center',
    marginBottom: 1,
    margin: 4,
  },
});

export default TestScreen;
