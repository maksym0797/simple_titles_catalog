import 'react-native-gesture-handler';
import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './context';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function TabNavigation() {
    return (
        <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            const iconRouteMap = {
                                Adverts: <View style={{marginTop: 5}}><IconFeather name={'search'} size={size} color={color} /></View>,
                                Favourites: <View style={{marginTop: 5}}><IconFeather name={'heart'} size={size} color={color} /></View>,
                                MyObjectsTab: <View style={{marginTop: 5}}><IconFontAwesome name={'home'} size={size + 5} color={color} /></View>,
                                Chat: <View style={{marginTop: 5}}><IconMaterialCommunityIcons name={'chat'} size={size + 5} color={color} /></View>,
                                Profile: <View style={{marginTop: 5}}><IconEvilIcons name={'user'} size={size + 13} color={color} /></View>
                            };
                        return iconRouteMap[route.name];
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Adverts" component={AdvertsScreen} options={{ title: 'Объявления' }} />
                    <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ title: 'Избранное' }} />
                    <Tab.Screen name="MyObjectsTab" component={MyObjectsScreen} options={{ title: 'Мой кабинет' }} />
                    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
        </Tab.Navigator>
    );
}
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
);

React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
}, []);

const authContext = React.useMemo(
    () => ({
      signIn: async (data: string, skipSave: boolean = false) => {

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
		// In the example, we'll use a dumm y token
		if (!skipSave) {
			AsyncStorage.setItem('userToken', data);
		}
		console.log(data);

        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => {
		AsyncStorage.removeItem('userToken');
		AsyncStorage.removeItem('user');
		  dispatch({ type: 'SIGN_OUT' })
	  },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data });
      },
    }),
    []
);

return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator headerMode="none">
        {state.userToken == null ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="App" component={TabNavigation} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}


