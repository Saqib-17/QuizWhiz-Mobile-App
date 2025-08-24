import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomHeader from '../components/BottomHeader'; // ✅ Fixed bottom header

export default function SubjectScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params || {}; // Received from GroupScreen

  // Subjects per group
  const subjectsData: Record<string, { name: string; image: any }[]> = {
    Science: [
      { name: 'physics', image: require('../../assets/images/physics.png') },
      { name: 'chemistry', image: require('../../assets/images/chemistry.png') },
      { name: 'biology', image: require('../../assets/images/biology.png') },
    ],
    Commerce: [
      { name: 'business', image: require('../../assets/images/businessSub.png') },
      { name: 'accounting', image: require('../../assets/images/Accounting.png') },
      { name: 'economics', image: require('../../assets/images/Economics.png') },
    ],
    Arts: [
      { name: 'history', image: require('../../assets/images/history.png') },
      { name: 'literature', image: require('../../assets/images/literature.png') },
      { name: 'geography', image: require('../../assets/images/geography.png') },
    ],
  };

  const subjects = subjectsData[group] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Subject For Quiz</Text>

        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('QuestionSet', { subject: subject.name })}
          >
            <Image source={subject.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{subject.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ✅ Fixed Bottom Header */}
      <BottomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // light cream
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',   // Center vertically if fewer subjects
    alignItems: 'center',       // Center horizontally
    paddingVertical: 40,
    paddingBottom: 100,         // Leave space for bottom header
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6B1E00',
  },
  card: {
    backgroundColor: '#FFD966',
    width: '80%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6B1E00',
  },
});
