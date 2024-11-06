import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your screens
import SplashScreen from './screens/SplashScreen';
import HomePage from './screens/HomePage';
//import BookDetailPage from './screens/BookDetailPage';
//import MovieDetailPage from './screens/MovieDetailPage';
import CharacterPage from './screens/CharacterPage';
import CharacterDetailPage from './screens/CharacterDetailPage';
import PotionPage from './screens/PotionPage';
import PotionDetailPage from './screens/PotionDetailPage';
import SpellPage from './screens/SpellPage';
import SpellDetailPage from './screens/SpellDetailPage';
import AboutPage from './screens/AboutPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator with Icons
function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    // Assign an icon based on route name
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Character') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Potion') {
                        iconName = focused ? 'flask' : 'flask-outline';
                    } else if (route.name === 'Spell') {
                        iconName = focused ? 'star' : 'star-outline';
                    } else if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }

                    // Return the Icon component
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'gold',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: 'black' },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Character" component={CharacterPage} />
            <Tab.Screen name="Potion" component={PotionPage} />
            <Tab.Screen name="Spell" component={SpellPage} />
            <Tab.Screen name="About" component={AboutPage} />
        </Tab.Navigator>
    );
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Main Tabs */}
                <Stack.Screen name="Tabs" component={Tabs} />

                {/* Detail pages accessible from Tabs */}
                <Stack.Screen name="CharacterDetailPage" component={CharacterDetailPage} options={{ title: 'Character Detail' }} />
                <Stack.Screen name="PotionDetail" component={PotionDetailPage} options={{ title: 'Potion Detail' }} />
                <Stack.Screen name="SpellDetailPage" component={SpellDetailPage} />
                {/*<Stack.Screen name="BookDetail" component={BookDetailPage} />*/}
                {/*<Stack.Screen name="MovieDetail" component={MovieDetailPage} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
