// app/components/BottomHeader.tsx
import { Ionicons } from '@expo/vector-icons'; // ✅ Solid icons
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BottomHeader({ isLoggedIn = false }) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#FFF6CC' }}>
      <View style={styles.container}>
        {/* ✅ Home Button with solid icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <Ionicons name="home" size={28} color="#D36831" />
        </TouchableOpacity>

        {/* Center Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <Text style={styles.logo}>QuizWhiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#FFF6CC',
    borderTopWidth: 1,
    borderTopColor: '#E0CFAF',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D36831',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D36831',
  },
});
