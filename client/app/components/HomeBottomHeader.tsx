import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeBottomHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Left: Home */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={28} color="#D36831" />
      </TouchableOpacity>

      {/* Middle: QuizWhiz */}
      <Text 
        style={styles.logoText} 
        onPress={() => navigation.navigate('Home')}
      >
        QuizWhiz
      </Text>

      {/* Right: Profile */}
     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
  <Ionicons name="person-circle" size={28} color="#D36831" />
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#FFF8DC', // ✅ Match your current bottom header background
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D36831',
  },
});
