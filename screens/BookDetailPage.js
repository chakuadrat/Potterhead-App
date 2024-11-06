/*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BookDetailPage = ({ route }) => {
    const { id } = route.params; // Get the book ID from navigation params
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://api.potterdb.com/v1/books/${id}`);
                setBook(response.data.data.attributes);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!book) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Book not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{book.title}</Text>
            <View style={styles.detailsContainer}>
                <Image
                    source={{ uri: book.image || 'https://via.placeholder.com/150' }}
                    style={styles.coverImage}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Title</Text>
                    <Text style={styles.value}>{book.title}</Text>

                    <Text style={styles.label}>Author</Text>
                    <Text style={styles.value}>J.K. Rowling</Text>

                    <Text style={styles.label}>Release Date</Text>
                    <Text style={styles.value}>{book.released_on || 'Unknown'}</Text>

                    <Text style={styles.label}>Pages</Text>
                    <Text style={styles.value}>{book.pages || 'N/A'}</Text>

                    <Text style={styles.label}>Dedication</Text>
                    <Text style={styles.value}>{book.dedication || 'None'}</Text>

                    <Text style={styles.label}>Summary</Text>
                    <Text style={styles.value}>{book.summary || 'No summary available.'}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1e1e2f',
        padding: 20,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e2f',
    },
    loadingText: {
        color: 'gold',
        fontSize: 18,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        flexDirection: 'row',
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        alignItems: 'flex-start',
    },
    coverImage: {
        width: 150,
        height: 225,
        borderRadius: 5,
        marginRight: 20,
    },
    infoContainer: {
        flex: 1,
    },
    label: {
        color: 'lightgray',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },
    backButton: {
        marginTop: 20,
        backgroundColor: '#ff79c6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookDetailPage;
*/