import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataStore, Storage, Auth } from 'aws-amplify'
import { Post } from '../src/models'
import PostComponent from '../components/PostComponent'

function CreatePostScreen() {
  const [posts, setPosts] = React.useState([]);
  let subscription;
  React.useEffect(() => {
    fetchPosts();
    subscribe();
    return () => subscription && subscription.unsubscribe();
  }, [])
  async function subscribe() {
    subscription = DataStore.observe(Post).subscribe(() => {
      fetchPosts();
    });
  }
  async function fetchPosts() {
    const { username } = await Auth.currentAuthenticatedUser()
    const dataStoreQuery = await DataStore.query(Post, p => p.owner('eq', username));
    let postData = await Promise.all(dataStoreQuery.map(async post => {
      post = { ...post };
      const signedImage = await Storage.get(post.image);
      post.image = signedImage;
      return post;
    }))
    setPosts(postData);
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>All Posts</Text>
      {
        posts.map(post => <PostComponent key={post.id} {...post} />)
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 15
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  userInfo: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputStyle: {
    height: 50,
    backgroundColor: '#ddd',
    marginBottom: 5,
    paddingHorizontal: 10
  }
});

export default CreatePostScreen