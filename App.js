import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import { getAuth } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginView} />
          <Stack.Screen name="Home" component={HomeView} />
        </Stack.Navigator>
      </NavigationContainer>

      <View style={styles.footerContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.footerContent}
        >
          <Pressable>
            <View style={styles.footerItem}>
              <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
              <Text>Accueil</Text>
            </View>
          </Pressable>

          <Pressable>
            <View style={styles.footerItem}>
              <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
              <Text>Statistiques</Text>
            </View>
          </Pressable>

          <Pressable>
            <View style={styles.footerItem}>
              <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
              <Text>Documents</Text>
            </View>
          </Pressable>

          <Pressable>
            <View style={styles.footerItem}>
              <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
              <Text>Calendrier</Text>
            </View>
          </Pressable>

          <Pressable>
            <View style={styles.footerItem}>
              <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
              <Text>Profil</Text>
            </View>
          </Pressable>

        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: "solid black",
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
  },
  footerItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});
