import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const HomeView = ({ route }) => {

  return (
    <View>
      <Text>Home View</Text>
      <QRCode value='https://www.github.com/lucasdetp'></QRCode>
    </View>
  );
}

export default HomeView;

const styles = StyleSheet.create({});