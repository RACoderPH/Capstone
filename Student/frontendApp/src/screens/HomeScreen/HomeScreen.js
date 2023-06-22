import { View, Text ,StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';


const Tab = createBottomTabNavigator();

const SettingsScreen = () => (
  <View>
    <View style={styles.UserContainer}>
      <Text style={styles.txtUser}>Hello User</Text>
      <Text>User Image</Text>
    </View>
  </View>
);

const HomeScreen = () => (
  <View>
    <Text>Home Screen</Text>
  </View>
);

const ChatScreen = () => (
  <View>
    <Text>Chat Screen</Text>
  </View>
);

const NotificationScreen = () => (
  <View>
    <Text>Notification Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View>
    <Text>Profile Screen</Text>
  </View>
);
const Apps = () => {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Chats') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Chats" component={ChatScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  UserContainer: {
    flexDirection: 'row',
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
    padding: 5,
  },
      txtUser:{
        color:'black',
        fontSize:16,
        textAlign:'right',
      }
})

export default Apps;
