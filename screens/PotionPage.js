import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PotionPage = () => {
    const navigation = useNavigation();
    const [potions, setPotions] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPotions = async () => {
            try {
                const response = await axios.get('https://api.potterdb.com/v1/potions'); // Update with correct endpoint if different
                setPotions(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching potions:", error);
                setLoading(false);
            }
        };

        fetchPotions();
    }, []);

    const filteredPotions = potions.filter((potion) =>
        potion.attributes.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                placeholderTextColor="gray"
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <Text style={styles.resultCount}>{filteredPotions.length} results</Text>
            {loading ? (
                <ActivityIndicator size="large" color="gold" style={styles.loadingText} />
            ) : (
                <FlatList
                    data={filteredPotions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.attributes.image || 'https://via.placeholder.com/150' }}
                                style={styles.image}
                            />
                            <Text style={styles.potionName}>{item.attributes.name}</Text>
                            <Text style={styles.potionInfo}>⭐ {item.attributes.difficulty || 'Unknown Difficulty'}</Text>
                            <Text style={styles.potionInfo}>📝 {item.attributes.effect || 'No effect description'}</Text>
                            <Text style={styles.potionInfo}>🎨 {item.attributes.color || 'No color specified'}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('PotionDetail', { potionId: item.id })}
                            >
                                <Text style={styles.buttonText}>View Potion</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>No potions found</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', padding: 10 },
    header: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    searchBar: {
        backgroundColor: '#333',
        color: 'white',
        padding: 12,
        marginTop: 30,
        marginBottom: 12,
        borderRadius: 5,
    },
    resultCount: { color: 'gray', marginBottom: 10, marginVertical: 5,  paddingLeft: 5 },
    loadingText: { color: 'white', textAlign: 'center', marginTop: 20 },
    card: {
        backgroundColor: '#222',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
    potionName: { color: 'gold', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
    potionInfo: { color: 'lightgray', fontSize: 14, marginBottom: 3, textAlign: 'center' },
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

export default PotionPage;
