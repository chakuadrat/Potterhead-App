import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SpellPage = () => {
    const [spells, setSpells] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await axios.get('https://api.potterdb.com/v1/spells');
                setSpells(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching spells:", error);
                setLoading(false);
            }
        };

        fetchSpells();
    }, []);

    const filteredSpells = spells.filter((spell) =>
        spell.attributes.name.toLowerCase().includes(search.toLowerCase())
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
            <Text style={styles.resultCount}>{filteredSpells.length} results</Text>
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={filteredSpells}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.attributes.image || 'https://via.placeholder.com/150' }}
                                style={styles.image}
                            />
                            <Text style={styles.spellName}>{item.attributes.name}</Text>
                            <Text style={styles.spellInfo}>🔮 {item.attributes.incantation || 'No incantation'}</Text>
                            <Text style={styles.spellInfo}>✨ {item.attributes.type || 'Unknown type'}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('SpellDetailPage', { spellId: item.id })}
                            >
                                <Text style={styles.buttonText}>View Spell</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>No spells found</Text>}
                    contentContainerStyle={styles.listContent}
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
    resultCount: { color: 'gray', marginBottom: 10, marginVertical: 5,  paddingLeft: 5 },
    loadingText: { color: 'white', textAlign: 'center', marginTop: 20 },
    card: {
        backgroundColor: '#222',
        padding: 15,
        borderRadius: 10,
        marginBottom: 7,
        alignItems: 'center',
        width: 400, 
    },
    image: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 10 },
    spellName: { color: 'gold', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
    spellInfo: { color: 'lightgray', fontSize: 14, textAlign: 'center', marginBottom: 5 },
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
    listContent: { alignItems: 'center' }, 
});

export default SpellPage;
