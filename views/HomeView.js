import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const HomeView = ({ route }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userUid = user.uid;

      async function fetchUserRole() {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', userUid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setRole(userData.roles);
          } else {
            console.error("Le document de l'utilisateur n'a pas été trouvé.");
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du rôle :', error);
        }
      }

      fetchUserRole();
    }
  }, []);

  return (
    <View>
      <Text>Home View</Text>
      {role === 'prof' && <QRCode value='https://www.github.com/lucasdetp'></QRCode>}
    </View>
  );
}

export default HomeView;

const styles = StyleSheet.create({});