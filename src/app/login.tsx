import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const { username: storedUsername, password: storedPassword } = JSON.parse(user);
        if (username === storedUsername && password === storedPassword) {
          Alert.alert('Success', 'Login Successful');
          navigation.navigate('(tabs)');
        } else {
          Alert.alert('Error', 'Invalid username or password');
        }
      } else {
        Alert.alert('Error', 'No user found. Please register first');
      }
    } catch (error) {
      console.log('Error retrieving data', error);
      Alert.alert('Error', 'There was an error logging in');
    }
  };

  return (
      <View style={styles.container}>
        <Image 
          source={require('@/assets/backgr.jpg')}
          style={styles.background}
          contentFit="cover"
        />
        <Text style={styles.title}>Login</Text>
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
        <Button title="Login" onPress={handleLogin} color="#841584" />
        <Text 
          style={styles.link}
          onPress={() => navigation.navigate('register')}
        >
          Don't have an account? Register here.
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

export default LoginScreen;
