import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CharacterPage = () => {
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get('https://hp-api.onrender.com/api/characters'); // Fetch data from the API
                setCharacters(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching characters:", error);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    // Filter characters based on search input (case-insensitive)
    const filteredCharacters = characters.filter((character) =>
        character.name && character.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search characters"
                placeholderTextColor="gray"
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <Text style={styles.resultsText}>{filteredCharacters.length} results</Text>
            
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={filteredCharacters}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.image || 'https://via.placeholder.com/150' }}
                                style={styles.image}
                            />
                            <Text style={styles.itemName}>{item.name}</Text>
                            
                            {/* Display character details */}
                            {item.house && <Text style={styles.itemInfo}>House: {item.house}</Text>}
                            {item.species && <Text style={styles.itemInfo}>Species: {item.species}</Text>}
                            {item.gender && <Text style={styles.itemInfo}>Gender: {item.gender}</Text>}
                            {item.patronus && <Text style={styles.itemInfo}>Patronus: {item.patronus}</Text>}
                            {item.ancestry && <Text style={styles.itemInfo}>Ancestry: {item.ancestry}</Text>}
                            {item.boggart && <Text style={styles.itemInfo}>Boggart: {item.boggart}</Text>}
                            
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('CharacterDetailPage', { character: item })}
                            >
                                <Text style={styles.buttonText}>View Character</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>No characters found</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', padding: 10 },
    searchBar: {
        backgroundColor: '#333',
        color: 'white',
        padding: 12,
        marginTop: 30,
        marginBottom: 12,
        borderRadius: 5,
    },
    resultsText: { color: 'gray', marginVertical: 5, paddingLeft: 5 },
    loadingText: { color: 'gray', textAlign: 'center', marginTop: 20 },
    card: {
        backgroundColor: '#222',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    image: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    itemName: { color: 'gold', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    itemInfo: { color: 'lightgray', fontSize: 14, textAlign: 'center' },
    button: {
        marginTop: 15,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: 'gold',
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonText: { color: 'black', fontSize: 15 },
    emptyText: { color: 'gray', textAlign: 'center', marginTop: 20 },
});

export default CharacterPage;
