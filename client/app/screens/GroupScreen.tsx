import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import BottomHeader from '../components/BottomHeader';
import ProtectedRoute from '../components/ProtectedRoute'; // ✅ Import default correctly

function GroupScreen({ navigation }) {
  const groups = [
    { name: 'Commerce', image: require('../../assets/images/business.png') },
    { name: 'Science', image: require('../../assets/images/science.png') },
    { name: 'Arts', image: require('../../assets/images/arts.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Which Group are you in?</Text>
        {groups.map((group, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Subject', { group: group.name })}
          >
            <Image source={group.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomHeader />
    </SafeAreaView>
  );
}

export default ProtectedRoute(GroupScreen); // ✅ Wrap with HOC


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // light cream
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // center vertically if few items
    alignItems: 'center',      // center horizontally
    paddingVertical: 40,
    paddingBottom: 100,        // space for bottom header
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
