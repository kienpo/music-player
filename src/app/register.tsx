// src/app/register.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'expo-image'

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (username && password) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
        Alert.alert('Success', 'Registration Successful');
        navigation.navigate('login');
      } catch (error) {
        console.log('Error saving data', error);
        Alert.alert('Error', 'There was an error registering');
      }
    } else {
      Alert.alert('Error', 'Please enter a username and password');
    }
  };

  return (
      <View style={styles.container}>
        <Image 
          source={require('@/assets/backgr.jpg')}
          style={styles.background}
          contentFit="cover"
        />
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        <Button title="Register" onPress={handleRegister} color="#841584" />
        <Text 
          style={styles.link}
          onPress={() => navigation.navigate('login')}
        >
          Already have an account? Login here.
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    backgroundColor: '#444',
    color: '#fff',
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  link: {
    color: '#bbb',
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
