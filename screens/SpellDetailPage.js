import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const SpellDetailPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { spellId } = route.params;

    const [spell, setSpell] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpellDetails = async () => {
            try {
                const response = await axios.get(`https://api.potterdb.com/v1/spells/${spellId}`);
                setSpell(response.data.data.attributes);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching spell details:", error);
                setLoading(false);
            }
        };

        fetchSpellDetails();
    }, [spellId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {spell && (
                <>
                    <Text style={styles.header}>{spell.name}</Text>
                    <View style={styles.card}>
                        <Image
                            source={{ uri: spell.image || 'https://via.placeholder.com/150' }}
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Name</Text>
                            <Text style={styles.infoText}>{spell.name}</Text>
                            <Text style={styles.infoTitle}>Effect</Text>
                            <Text style={styles.infoText}>{spell.effect || 'No effect description'}</Text>
                            <Text style={styles.infoTitle}>Category</Text>
                            <Text style={styles.infoText}>{spell.type || 'Unknown type'}</Text>
                            <Text style={styles.infoTitle}>Light</Text>
                            <Text style={styles.infoText}>{spell.light || 'No color specified'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </>
            )}
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
    header: { color: 'gold', fontSize: 27, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    card: {
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 15,
    },
    infoContainer: { alignItems: 'flex-start', width: '100%' },
    infoTitle: { color: 'gold', fontSize: 16, fontWeight: 'bold', marginTop: 10 },
    infoText: { color: 'lightgray', fontSize: 16, marginBottom: 5 },
    backButton: {
        backgroundColor: 'gold',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 30,
        alignSelf: 'center',
    },
    backButtonText: { color: 'black', fontSize: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f' },
    loadingText: { color: 'white', fontSize: 18 },
});

export default SpellDetailPage;
