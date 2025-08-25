import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/firebase';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = (Component) => {
  return function Wrapper(props) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setLoading(false);

        if (!currentUser) {
          setShowModal(true); // show modal if not logged in
        }
      });

      return () => unsubscribe();
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#D36831" />
        </View>
      );
    }

    if (!user) {
      return (
        <View style={{ flex: 1 }}>
          {/* Custom Modal */}
          <Modal transparent visible={showModal} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Access Denied</Text>
                <Text style={styles.modalMessage}>Please log in to continue your quiz.</Text>
                
                <View style={styles.buttonRow}>
                  <TouchableOpacity
  style={[styles.button, styles.cancelButton]}
  onPress={() => {
    setShowModal(false);
    navigation.replace('Home'); // Redirect to HomeScreen
  }}
>
  <Text style={styles.cancelText}>Not Now</Text>
</TouchableOpacity>


                  <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.replace('Login')}
                  >
                    <Text style={styles.loginText}>Go to Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

    return <Component {...props} />;
  };
};

export default ProtectedRoute;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF8DC', // Light cream
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6B1E00',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFD966',
  },
  loginButton: {
    backgroundColor: '#D36831',
  },
  cancelText: {
    color: '#6B1E00',
    fontWeight: '600',
    fontSize: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
