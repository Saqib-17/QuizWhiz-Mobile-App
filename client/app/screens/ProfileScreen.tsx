import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import BottomHeader from '../components/BottomHeader';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

interface UserProfile {
  fullName: string;
  email: string;
  userClass?: string;
  uid: string;
}

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError('No logged-in user found.');
          setLoading(false);
          return;
        }

        const res = await fetch('https://quiz-whiz-backend.vercel.app/api/users');
        const users: UserProfile[] = await res.json();
        const foundUser = users.find(u => u.uid === currentUser.uid || u.email === currentUser.email);

        if (!foundUser) {
          setError('User profile not found.');
        } else {
          setUser(foundUser);
        }
      } catch (err: any) {
        console.log('Error fetching user data:', err.message);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err: any) {
      Alert.alert('Logout Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={require('../../assets/images/form-dp.png')} style={styles.avatar} />
          </View>
          <Text style={styles.welcomeText}>
            Welcome, {user?.fullName || 'Guest'}!
          </Text>
        </View>

        <View style={styles.infoCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#D36831" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <Text style={styles.infoTitle}>Profile Details</Text>
              <Text style={styles.infoText}>Full Name: {user?.fullName}</Text>
              {user?.userClass && <Text style={styles.infoText}>Class: {user.userClass}</Text>}
              <Text style={styles.infoText}>Email: {user?.email}</Text>
            </>
          )}
        </View>

        {!loading && !error && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      <BottomHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC' },
  scrollContent: { paddingBottom: 20 },

  header: {
    backgroundColor: '#D36831',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    borderWidth: 4,
    borderColor: '#FFD966',
    borderRadius: 60,
    padding: 3,
    marginBottom: 15,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  welcomeText: { fontSize: 22, fontWeight: '700', color: '#fff' },

  infoCard: {
    backgroundColor: '#DFF1EA',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: { fontSize: 20, fontWeight: '700', color: '#6B1E00', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#555', marginBottom: 6 },

  logoutButton: {
    backgroundColor: '#D36831',
    marginHorizontal: 50,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
});
