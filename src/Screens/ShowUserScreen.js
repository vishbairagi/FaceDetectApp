import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { users } from '../data/users'; // Adjust path if needed

const ShowUserScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={item.image} style={styles.userImage} />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  const handleAddUser = () => {
    console.log('Add new user pressed');
    // navigation.navigate('AddUser') or any other logic
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

    
    </View>
  );
};

export default ShowUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: 'cover', // optional but helpful
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#22c55e',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: '#ffffff',
    marginTop: -2,
  },
});