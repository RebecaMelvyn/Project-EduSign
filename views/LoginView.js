import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getFirestore } from "firebase/firestore";

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignUp = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.uid);

                const userData = {
                    nom: user.email,
                    uid: user.uid,
                    present: false,
                    roles: 'eleve',
                };

                setDoc(userDocRef, userData)
                    .then(() => {
                        navigation.navigate('Home');
                    })
                    .catch((error) => {
                        console.error('Erreur lors de l\'ajout du document :', error);
                    });
            })
            .catch((error) => {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
            });
    };


    const handleSignIn = () => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user.email);
                navigation.navigate('Home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.header}>
                <Pressable
                    style={[styles.edusignButton, { backgroundColor: 'orange' }]}
                >
                    <Text style={styles.edusignText}>Edusign</Text>
                    <Image
                        source={require('../assets/plume.png')}
                        style={styles.plumeIcon}
                    />
                </Pressable>
            </View>

            <View style={styles.scanContainer}>
                <Text style={styles.scanTitle}>Scan It</Text>
                <Text style={styles.scanDescription}>Pas besoin de feuille de présence. Utilisez votre téléphone et c'est parti !</Text>
                <Image style={styles.phoneImage} source={require('../assets/phone.png')} />
            </View>



            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Mot de passe'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Connexion</Text>
                </Pressable>
            </View>

            <Pressable
                onPress={handleSignUp}
                style={styles.buttonOutline}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </Pressable>

            <Pressable
                onPress={() => { /* Gérer la connexion avec Microsoft */ }}
                style={styles.microsoftButton}
            >
                <Text style={styles.microsoftButtonText}>Connexion avec Microsoft</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -100,
    },
    edusignButton: {
        flexDirection: 'row',
        backgroundColor: '#orange',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 70,
    },
    edusignText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    plumeIcon: {
        width: 24,
        height: 24,
    },
    scanContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scanTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    scanDescription: {
        textAlign: 'center',
        marginVertical: 10,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
    },
    phoneImage: {
        width: 150,
        height: 150,
    },
    scrollButtonsContainer: {
        marginVertical: 20,
    },
    scrollButton: {
        backgroundColor: '#0782F9',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    scrollButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'orange',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'orange',
        width: '60%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'orange',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonOutlineText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    microsoftButton: {
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    microsoftButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default LoginView;