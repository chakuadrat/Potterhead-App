import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PotionDetailPage = ({ route }) => {
    const { potionId } = route.params;
    const [potion, setPotion] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPotionDetails = async () => {
            try {
                const response = await axios.get(`https://api.potterdb.com/v1/potions/${potionId}`);
                console.log("API Response:", response.data);
                setPotion(response.data.data.attributes);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching potion details:", error);
                setLoading(false);
            }
        };

        fetchPotionDetails();
    }, [potionId]);

    if (loading) {
        return <ActivityIndicator size="large" color="gold" style={styles.loading} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {potion && (
                <>
                    <Image source={{ uri: potion.image || 'https://via.placeholder.com/150' }} style={styles.image} />
                    <Text style={styles.title}>{potion.name}</Text>
                    <Text style={styles.info}>Difficulty: {potion.difficulty || 'Unknown'}</Text>
                    <Text style={styles.info}>Effect: {potion.effect || 'No effect description'}</Text>
                    <Text style={styles.info}>Color: {potion.color || 'No color specified'}</Text>
                </>
            )}

            {/* Centered Back Button at the Bottom */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
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
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: 200, height: 200, marginBottom: 20, resizeMode: 'contain' },
    title: { color: 'gold', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    info: { color: 'lightgray', fontSize: 16, textAlign: 'center', marginBottom: 5 },
    backButton: {
        backgroundColor: 'gold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    backButtonText: { color: 'black', fontSize: 16 },
});

export default PotionDetailPage;
