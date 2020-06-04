import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import CreatePostScreen from '../screens/CreatePostScreen';
import AllPostsScreen from '../screens/AllPostsScreen'
import MyPostsScreen from '../screens/MyPostsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { withAuthenticator } from 'aws-amplify-react-native'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Posts';

function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Posts"
        component={AllPostsScreen}
        options={{
          title: 'Posts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="My Posts"
        component={MyPostsScreen}
        options={{
          title: 'My Posts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list-box" />,
        }}
      />
      <BottomTab.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={{
          title: 'Create Post',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-create" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />
        }}
      />
    </BottomTab.Navigator>
  );
}

export default withAuthenticator(BottomTabNavigator)

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
