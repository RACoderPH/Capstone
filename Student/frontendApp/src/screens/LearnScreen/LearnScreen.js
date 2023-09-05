import React, { useState } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { Searchbar} from 'react-native-paper';
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
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        onIconPress={searchBook}
      />
      <ScrollView style={styles.scrollView}>
        <CardBook book={bookData}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView:{
    marginBottom:50,
  },
  container:{
      height:"100%",
      margin:14,
  },
  search:{
      marginBottom:5,
      marginTop:5,
  },
  content:{
      padding:10,
      marginBottom:10
  }


});
export default LearnScreen;
