/*
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const MovieDetailPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.potterdb.com/v1/movies/${id}`);
                setMovie(response.data.data.attributes);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Movie not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <Image
                source={{ uri: movie.image || 'https://via.placeholder.com/300' }}
                style={styles.image}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Title</Text>
                <Text style={styles.info}>{movie.title}</Text>

                <Text style={styles.label}>Release Date</Text>
                <Text style={styles.info}>{movie.released_on || 'Unknown'}</Text>

                <Text style={styles.label}>Box Office</Text>
                <Text style={styles.info}>{movie.box_office || 'N/A'}</Text>

                <Text style={styles.label}>Budget</Text>
                <Text style={styles.info}>{movie.budget || 'N/A'}</Text>

                <Text style={styles.label}>Rating</Text>
                <Text style={styles.info}>{movie.rating || 'N/A'}</Text>

                <Text style={styles.label}>Summary</Text>
                <Text style={styles.info}>{movie.summary || 'No summary available'}</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e1e2f', padding: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
    loadingText: { color: 'gold', fontSize: 18 },
    title: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#444',
    },
    label: { color: 'gold', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    info: { color: 'lightgray', fontSize: 14, marginBottom: 15 },
    backButton: {
        backgroundColor: 'gold',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
        alignItems: 'center',
    },
    backButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
});

export default MovieDetailPage;
*/