import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CharacterDetailPage = ({ route }) => {
    const { character } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: character.image || 'https://via.placeholder.com/150' }}
                style={styles.image}
            />
            <Text style={styles.name}>{character.name}</Text>
            
            <View style={styles.infoContainer}>
                {character.house && <Text style={styles.info}>House: {character.house}</Text>}
                {character.species && <Text style={styles.info}>Species: {character.species}</Text>}
                {character.gender && <Text style={styles.info}>Gender: {character.gender}</Text>}
                {character.patronus && <Text style={styles.info}>Patronus: {character.patronus}</Text>}
                {character.ancestry && <Text style={styles.info}>Ancestry: {character.ancestry}</Text>}
                {character.wand && character.wand.wood && (
                    <Text style={styles.info}>
                        Wand: {character.wand.wood} wood, {character.wand.core} core, {character.wand.length} inches
                    </Text>
                )}
            </View>
            
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'black', 
        alignItems: 'center', 
        padding: 50,
        paddingTop: 150 
    },
    image: { 
        width: 150, 
        height: 150, 
        borderRadius: 75, 
        marginBottom: 20 
    },
    name: { 
        color: 'gold', 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 20 
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    info: { 
        color: 'lightgray', 
        fontSize: 16, 
        textAlign: 'center', 
        marginBottom: 5 
    },
    backButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'gold',
        borderRadius: 5,
    },
    backButtonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default CharacterDetailPage;
