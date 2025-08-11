import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import GroupScreen from './screens/GroupScreen';
import SubjectScreen from './screens/SubjectScreen';
import QuestionSetScreen from './screens/QuestionSetScreen';
import ResultScreen from './screens/ResultScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen'; // ✅ New profile screen

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }} 
      initialRouteName="Home"
    >
      {/* ✅ Main App Screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Group" component={GroupScreen} />
      <Stack.Screen name="Subject" component={SubjectScreen} />
      <Stack.Screen name="QuestionSet" component={QuestionSetScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />

      {/* ✅ Auth Screens */}
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* ✅ Profile Screen */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
