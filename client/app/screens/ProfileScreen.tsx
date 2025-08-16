import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BottomHeader from '../components/BottomHeader'; // Regular header for profile page

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>Welcome to your profile page.</Text>
      </View>

      {/* ✅ Regular bottom header */}
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
