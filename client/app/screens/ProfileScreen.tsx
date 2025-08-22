import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import BottomHeader from '../components/BottomHeader';
import { auth } from '../firebase/firebase';

interface UserProfile {
  fullName: string;
  email: string;
  userClass?: string;
  uid: string;
}

export default function ProfileScreen() {
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

        // Fetch all users from backend
        const res = await fetch('https://quiz-whiz-backend.vercel.app/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const users: UserProfile[] = await res.json();

        // Find user by UID or email
        const foundUser = users.find(
          u => u.uid === currentUser.uid || u.email === currentUser.email
        );

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#D36831" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.title}>My Profile</Text>
            <Text style={styles.subtitle}>Welcome, {user?.fullName}!</Text>
            <Text style={styles.infoText}>Email: {user?.email}</Text>
            {user?.userClass && <Text style={styles.infoText}>Class: {user.userClass}</Text>}
          </>
        )}
      </View>

      <BottomHeader />
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D36831',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
