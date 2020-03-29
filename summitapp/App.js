/* eslint-disable react-native/no-inline-styles */
/**
 * React Native DataStore Sample App
 */

import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {Card, CardItem} from 'native-base';
import {DataStore, Predicates} from '@aws-amplify/datastore';
import {Post, PostStatus} from './src/models';
import CardComponent from './src/CardComponent'; // 카드 컴포넌트 추가

import Amplify from '@aws-amplify/core';
import awsConfig from './aws-exports';
Amplify.configure(awsConfig);

//class App extends Component {

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    listPosts(setPosts);
    console.log('conuseEffectdition');
    const subscription = DataStore.observe(Post).subscribe(msg => {
      console.log('subscription-', msg.model, msg.opType, msg.element);
      listPosts(setPosts);
    });
  }, []);

  onCreatePost = async () => {
    DataStore.save(
      new Post({
        title: title,
        body: body,
        status: PostStatus.ACTIVE,
      }),
    );
  };

  listPosts = async setPosts => {
    const posts = await DataStore.query(Post, Predicates.ALL);
    setPosts(posts);
  };

  onDelete = async () => {
    const deletedPosts = await DataStore.delete(Post, Predicates.ALL);
    console.log('DELETE_RESULT', deletedPosts);
  };

  return (
    <View style={{backgroundColor: '#282c34', flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          paddingTop: 50,
          paddingBottom: 10,
          color: '#ffffff',
          fontSize: 20,
        }}>
        React Native App
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <CardItem style={{height: 50, width: 300}}>
            <TextInput
              onChangeText={title => setTitle(title)}
              placeholder=" Title"
              style={{
                width: 250,
                borderColor: '#d9d9d9',
                borderWidth: 1,
                backgroundColor: '#f9f9f9',
              }}
            />
          </CardItem>
          <CardItem style={{height: 150, width: 300}}>
            <TextInput
              placeholder=" Body"
              onChangeText={body => setBody(body)}
              style={{
                height: 140,
                width: 250,
                borderColor: '#d9d9d9',
                borderWidth: 1,
                backgroundColor: '#f9f9f9',
              }}
            />
          </CardItem>
          <CardItem style={{height: 30, width: 300, alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.wrapButton}
              onPress={this.onCreatePost}>
              <Text>New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapButton} onPress={this.onDelete}>
              <Text>Delete All</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
        {posts.map((post, i) => (
          <CardComponent key={i} body={post.body} title={post.title} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  wrapButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});

export default App;
