import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import CardBook from '../../components/CardBook/CardBook';

const LearnScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookData, setBookData] = useState([]);

  const searchBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&filter=free-ebooks&key=AIzaSyBZUsdBLW72GDSxTuCYcsWatyRl2GWPGHM`
      );
      const { items } = response.data;
      setBookData(items || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search Mental Health Book"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        onIconPress={searchBook}
      />
      <ScrollView style={styles.scrollView}>
        <CardBook book={bookData} />
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: windowHeight * 0.1,
  },
  container: {
    height: '100%',
    margin: windowWidth * 0.05,
  },
  search: {
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.01,
  },
  content: {
    padding: windowWidth * 0.05,
    marginBottom: windowHeight * 0.05,
  },
});

export default LearnScreen;
