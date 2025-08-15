import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomHeader from '../components/BottomHeader';

// ✅ Import Firebase Auth
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userClass, setUserClass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignup = async () => {
  if (!fullName || !email || !password || !confirmPassword || !userClass) {
    alert('Please fill all fields.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    // ✅ Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });

    // ✅ Send user to backend
    await fetch('https://quiz-whiz-backend.vercel.app/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        email,
        userClass,
        uid: userCredential.user.uid,
      }),
    });

    setModalVisible(true);
  } catch (error) {
    console.log('Signup Error:', error.message);
    alert(error.message);
  }
};


  const handleExplore = () => {
    setModalVisible(false);
    navigation.navigate('Home'); // ✅ Go to Home after signup
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Text style={styles.logoText}>QuizWhiz</Text>

        {/* Top Image */}
        <Image
          source={require('../../assets/images/form-dp.png')}
          style={styles.topImage}
        />

        {/* Signup Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create a New Account</Text>
          <Text style={styles.formSubtitle}>Join QuizWhiz Today</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your class"
            value={userClass}
            onChangeText={setUserClass}
          />

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup} activeOpacity={0.8}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <View style={{ marginTop: 15, alignItems: 'center' }}>
            <Text style={{ color: '#555', fontSize: 14 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#D36831', fontWeight: '600', fontSize: 14, marginTop: 4 }}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ Success Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Welcome to QuizWhiz!</Text>
              <Text style={styles.modalMessage}>Your account has been created successfully.</Text>

              <TouchableOpacity style={styles.modalButton} onPress={handleExplore}>
                <Text style={styles.modalButtonText}>Start Exploring</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <BottomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC' },
  scrollContent: { alignItems: 'center', paddingBottom: 120, paddingTop: 20 },
  logoText: { fontSize: 28, fontWeight: '700', color: '#D36831', marginBottom: 10 },
  topImage: { width: 140, height: 140, resizeMode: 'contain', marginBottom: 15 },
  formCard: {
    backgroundColor: '#DFF1EA',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  formTitle: { fontSize: 20, fontWeight: '700', color: '#6B1E00', marginBottom: 4 },
  formSubtitle: { fontSize: 14, color: '#D36831', marginBottom: 20 },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signupButton: {
    backgroundColor: '#D36831',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  signupButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#6B1E00', marginBottom: 8, textAlign: 'center' },
  modalMessage: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 16 },
  modalButton: { backgroundColor: '#D36831', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
