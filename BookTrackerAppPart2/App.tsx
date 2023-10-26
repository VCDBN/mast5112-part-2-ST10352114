import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
} from 'react-native';

//REFERENCE :
//React Native (2022). React Native · A framework for building native apps using React. [online] reactnative.dev. Available at: https://reactnative.dev/.‌
//LOOM:
//https://www.loom.com/share/fa01f175f2a74b9c948bac6a4504b429?sid=e25838dc-2d98-436b-aa20-1e71fc9b36bf


interface Book {
  title: string;
  author: string;
  genre: string;
  pages: string;
}

const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');

  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState<Book[]>([]); 

  const addBook = () => {
    if (title === '' || author === '' || genre === '' || pages === '') {
      Alert.alert('Please fill all the details.');
      return;
    }

    const newBook: Book = { title, author, genre, pages }; 
    setBooks([newBook, ...books]);
//i have declared newBook, newtotalpages and avg pages
    const newTotalPages = parseInt(pages) + totalPages;
    setTotalPages(newTotalPages);

    const avgPages = newTotalPages / (books.length + 1);
    console.log(`Average pages: ${avgPages}`);
  };
//here are my styles for part 2
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        onChangeText={(text) => setAuthor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        onChangeText={(text) => setGenre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Pages"
        onChangeText={(text) => setPages(text)}
      />
      <Button title="Add Book" onPress={addBook} />
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <Text style={styles.book}>
            {item.title} by {item.author} - {item.genre} - {item.pages} pages
          </Text>
        )}
        keyExtractor={(item) => item.title}
      />
      <Text style={styles.stats}>
        Total Pages: {totalPages} - Average Pages: {(totalPages / books.length).toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  book: {
    fontSize: 14,
    marginBottom: 10,
  },
  stats: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default App;
