import React, { useState } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { Searchbar, Card, Text, Avatar, Button } from 'react-native-paper';

const LearnScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style = {styles.container}>
      <Searchbar
        style= {styles.search}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    <ScrollView style={{margin:10,marginBottom:150,heigh:'100%'}} >
        <MyComponent/>
        
    </ScrollView>
    

    </View>
  );
};

const MyComponent = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <Card style={styles.content}>
      <Card.Title title="Book Title" subtitle="Book Subtitle" left={LeftContent} />
      <Card.Content>
        <Text>Book content</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Read</Button>
      </Card.Actions>
    </Card>

    
  );
};

const styles = StyleSheet.create({
        container:{
            margin:1,
        },
        search:{
            
            marginBottom:5,
            marginTop:15,
        },
        content:{
            padding:10,
            marginBottom:10
        }


});

export default LearnScreen;
