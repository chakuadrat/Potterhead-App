import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const AboutPage = () => {
    const openGitHub = () => {
        Linking.openURL('https://github.com/chakuadrat');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Potterhead App</Text>
            <Text style={styles.subtitle}>Your ultimate guide to the magical world!</Text>
            
            <Text style={styles.sectionTitle}>About This App</Text>
            <Text style={styles.description}>
                Potterhead App is designed for fans of the Harry Potter universe. 
                Here, you can explore detailed information about the books, movies, characters, 
                potions, spells, and much more. Dive into the world of magic, uncover hidden secrets, 
                and revisit your favorite moments from Hogwarts and beyond!
            </Text>
            
            <Text style={styles.developer}>Developer</Text>
            <Text style={styles.name}>Nisrina Azka Salsabila</Text>
            
            <TouchableOpacity onPress={openGitHub}>
                <Text style={styles.link}>GitHub: github.com/chakuadrat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', padding: 20 },
    logo: { width: 100, height: 100, marginBottom: 20 },
    title: { color: 'gold', fontSize: 25, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { color: 'gold', fontSize: 16, textAlign: 'center', marginBottom: 40},
    sectionTitle: { color: 'gold', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    description: { color: 'lightgray', fontSize: 16, textAlign: 'center', marginTop: 10, paddingHorizontal: 50 },
    developer: { color: 'lightgray', fontSize: 20, textAlign: 'center', marginTop: 200, fontWeight: 'bold' },
    name: { color: 'lightgray', fontSize: 16, textAlign: 'center', marginTop: 5 },
    link: { color: 'gold', fontSize: 16, textAlign: 'center', marginTop: 10, textDecorationLine: 'underline' },
});

export default AboutPage;
