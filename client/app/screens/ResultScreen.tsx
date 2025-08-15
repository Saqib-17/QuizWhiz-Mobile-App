import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomHeader from '../components/BottomHeader';

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { answers, email } = route.params || { answers: [], email: null };

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const wrongAnswers = answers.length - correctAnswers;
  const incorrectQuestions = answers
    .map((a, i) => (!a.isCorrect ? `Question ${i + 1}` : null))
    .filter((q) => q !== null);

  // ✅ Send results to backend (optional)
  useEffect(() => {
    const sendResults = async () => {
      try {
        await fetch('https://quiz-whiz-backend.vercel.app/api/users/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            score: correctAnswers,
            total: answers.length,
            incorrectQuestions,
            date: new Date(),
          }),
        });
      } catch (err) {
        console.log('Error saving results:', err);
      }
    };

    if (email && answers.length > 0) {
      sendResults();
    }
  }, []);

  // Feedback generator
  const getFeedback = () => {
    const percentage = (correctAnswers / answers.length) * 100;
    if (percentage <= 30) return "Don't lose hope! Start with the basics and keep practicing—progress takes time.";
    if (percentage <= 60) return "Good job! You're improving steadily. Keep practicing to sharpen your skills.";
    if (percentage <= 80) return "Great work! You're performing well. A little extra effort will make you excel!";
    return "Amazing performance! You're excelling—keep pushing boundaries for greater success!";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Section */}
        <View style={styles.card}>
          <Text style={styles.scoreTitle}>Your Score {correctAnswers}/{answers.length}</Text>
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.scoreLabel}>Right</Text>
              <Text style={styles.scoreNumber}>{correctAnswers}</Text>
            </View>
            <View>
              <Text style={styles.scoreLabel}>Wrong</Text>
              <Text style={styles.scoreNumber}>{wrongAnswers}</Text>
            </View>
          </View>
        </View>

        {/* Leaderboard (Dummy for now) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <Text>1. Shahidul Sakib</Text>
          <Text>2. Nagi Sheishiro</Text>
          <Text>3. Isagi Yichiro</Text>
          <Text style={{ fontWeight: 'bold', color: 'maroon', marginTop: 5 }}>• You are on 10th</Text>
        </View>

        {/* Feedback */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          <Text style={{ marginTop: 6, textAlign: 'center' }}>{getFeedback()}</Text>
        </View>

        {/* Question Analysis */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Question Analysis</Text>
          {incorrectQuestions.length > 0 ? (
            <>
              <Text style={{ marginTop: 6 }}>You answered the following questions incorrectly:</Text>
              {incorrectQuestions.map((q, i) => (
                <Text key={i} style={{ marginTop: 3 }}>• {q}</Text>
              ))}
            </>
          ) : (
            <Text style={{ marginTop: 6 }}>No incorrect questions! Great job!</Text>
          )}
        </View>

        
      </ScrollView>

      <BottomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC' },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#DFF1EA',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  scoreTitle: { fontSize: 20, fontWeight: '700', color: '#D36831' },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 12 },
  scoreLabel: { fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center' },
  scoreNumber: { fontSize: 24, fontWeight: '700', color: '#D36831', textAlign: 'center', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#6B1E00', textAlign: 'center' },
  retakeButton: {
    marginTop: 20,
    backgroundColor: '#D36831',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '60%',
  },
  retakeButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
