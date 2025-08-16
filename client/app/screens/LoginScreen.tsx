import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomHeader from '../components/BottomHeader';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      // ✅ Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // ✅ Check backend if user exists
      const res = await fetch(`https://quiz-whiz-backend.vercel.app/api/users`);
      const users = await res.json();
      const foundUser = users.find(u => u.email === email);

      if (!foundUser) {
        alert('User logged in with Firebase but not found in backend.');
      }

      setModalVisible(true);
    } catch (error) {
      console.log('Login Error:', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8DC' }}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.centerContent}>
          <Image
            source={require('../../assets/images/form-dp.png')}
            style={styles.topImage}
          />

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>Login to Continue</Text>

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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 15, alignItems: 'center' }}>
              <Text style={{ color: '#555', fontSize: 14 }}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign up here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ✅ Success Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Login Successful!</Text>
              <Text style={styles.modalMessage}>Welcome back to QuizWhiz.</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                setModalVisible(false);
                navigation.navigate('Home');
              }}>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  centerContent: {
    alignItems: 'center',
  },
  topImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  formCard: {
    backgroundColor: '#DFF1EA',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6B1E00',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#D36831',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#D36831',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupLink: {
    color: '#D36831',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6B1E00',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#D36831',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
