import * as React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Auth } from 'aws-amplify';

function ProfileScreen() {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    checkUser()
  }, [])
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser()
    setUser(user)
  }
  async function signOut() {
    await Auth.signOut()
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        user && (
          <View>
            <Text style={styles.userInfo}>Username: {user.username}</Text>
            <Text style={styles.userInfo}>Email: {user.attributes.email}</Text>
            <Text style={styles.userInfo}>Phone: {user.attributes.phone_number}</Text>
            <Text style={styles.userInfo}>User ID: {user.attributes.sub}</Text>
          </View>
        )
      }
      <Button title="Sign Out" onPress={signOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
  }
});

export default ProfileScreen