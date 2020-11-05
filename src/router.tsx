import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './AuthContext';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import HomeScreen from './screens/Home';
import colors from './styles/colors';
import { TOKEN_NAME } from './constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={({ navigation, route }) => ({
                    headerTitleStyle: {
                        fontFamily: 'Arial',
                        color: colors.whiteText,
                        fontWeight: '300',
                        fontSize: 22,
                    },
                    headerStyle: {
                        backgroundColor: '#151515',
                    },
                })}
            />
        </Stack.Navigator>
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
                userToken = await AsyncStorage.getItem(TOKEN_NAME);
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
                    AsyncStorage.setItem(TOKEN_NAME, data);
                }
                console.log(data);

                dispatch({ type: 'SIGN_IN', token: data });
            },
            signOut: () => {
                AsyncStorage.removeItem(TOKEN_NAME);
                AsyncStorage.removeItem('user');
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (data) => {
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
            <Stack.Navigator headerMode='none'>
                {state.userToken == null ? (
                    <Stack.Screen name='Auth' component={AuthNavigator} />
                ) : (
                    <Stack.Screen name='App' component={AppNavigator} />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
