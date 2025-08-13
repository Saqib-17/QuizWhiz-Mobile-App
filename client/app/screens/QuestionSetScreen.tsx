import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomHeader from '../components/BottomHeader';

export default function QuestionSetScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { subject } = route.params || {};

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`https://quiz-whiz-backend.vercel.app/api/questions/${subject}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setError("No questions found.");
          return;
        }

        setQuestions(data);
        setAnswers(Array(data.length).fill(null));
      } catch (err) {
        setError('Error fetching questions. Please check your connection.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (subject) {
      fetchQuestions();
    }
  }, [subject]);

  const selectAnswer = (qIndex: number, optionText: string) => {
    const updated = [...answers];
    updated[qIndex] = optionText;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const result = questions.map((q, i) => {
      const selected = answers[i];
      const correctOption = q.options.find((opt) => opt.isCorrect)?.text;
      return {
        question: q.title,
        selected,
        isCorrect: selected === correctOption,
      };
    });

    navigation.navigate('Result', { answers: result });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#D36831" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{subject} Quiz</Text>

        {questions.map((q: any, index: number) => (
          <View key={index} style={styles.card}>
            <Text style={styles.questionTitle}>Question {index + 1}</Text>
            <Text style={styles.questionText}>{q.title}</Text>

            {q.options.map((opt: any, i: number) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.option,
                  answers[index] === opt.text && styles.selectedOption,
                ]}
                onPress={() => selectAnswer(index, opt.text)}
              >
                <Text
                  style={[
                    styles.optionText,
                    answers[index] === opt.text && styles.selectedOptionText,
                  ]}
                >
                  {opt.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Quiz</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC' },
  scrollContent: { padding: 16, paddingBottom: 120 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D36831',
    textAlign: 'center',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#DFF1EA',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D36831',
    marginBottom: 6,
  },
  questionText: { fontSize: 16, color: '#333', marginBottom: 12 },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    marginVertical: 4,
  },
  selectedOption: {
    backgroundColor: '#D36831',
    borderColor: '#D36831',
  },
  optionText: { fontSize: 16, color: '#333' },
  selectedOptionText: { color: '#fff', fontWeight: '600' },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#D36831',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: { marginTop: 10, fontSize: 16, color: '#333' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
});
