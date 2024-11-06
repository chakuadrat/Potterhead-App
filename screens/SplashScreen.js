import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => (
    <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
    logo: { width: 150, height: 150 },
});

export default SplashScreen;
