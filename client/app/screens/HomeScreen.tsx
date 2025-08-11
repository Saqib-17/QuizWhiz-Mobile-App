import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeBottomHeader from '../components/HomeBottomHeader'; // ✅ Special bottom header for home

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / Title */}
        <Text style={styles.logoText}>QuizWhiz</Text>

        {/* Banner Image */}
        <Image 
          source={require('../../assets/images/test.png')} 
          style={styles.bannerImage} 
        />

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome to QuizWhiz!</Text>
        <Text style={styles.subtitleText}>Sharpen your knowledge with fun quizzes.</Text>

        {/* CTA Buttons */}
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('Group')}
        >
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ HomeScreen uses its own header with profile button */}
      <HomeBottomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // Light cream
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 120,  // Leave space for bottom header
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#D36831',
    marginBottom: 20,
  },
  bannerImage: {
    width: '90%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6B1E00',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#D36831',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFD966',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6B1E00',
    fontSize: 16,
    fontWeight: '600',
  },
});
