import React from 'react';
import { StyleSheet, Linking, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const CardBook = ({ book }) => {
  const handleReadPress = (previewLink) => {
    if (previewLink) {
      Linking.openURL(previewLink);
    }
  };

  return (
    <View>
      {book.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title title={item.volumeInfo?.title || 'No Title'} subtitle={`Date Published: ${item.volumeInfo?.publishedDate || 'No Subtitle'}`} />
          <Card.Cover
            style={styles.cardCover}
            source={{ uri: item.volumeInfo?.imageLinks?.thumbnail || 'https://picsum.photos/700' }}
            resizeMode="contain" // Set resizeMode to 'contain' for clarity
          />
          <Card.Content>
            <Text style={styles.description}>{item.volumeInfo?.description || 'No description available'}</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button mode="contained" onPress={() => handleReadPress(item.volumeInfo?.previewLink)}>
              Read
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF', // White background color
    borderRadius: 10,
    elevation: 2, // Add shadow
  },
  cardCover: {
    height: 200, // Adjust the height for the book cover image
  },
  description: {
    marginBottom: 10,
    color: '#333', // Dark gray text color
  },
  cardActions: {
    justifyContent: 'center',
  },
});

export default CardBook;
