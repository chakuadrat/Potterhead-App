import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import hogwartsCrest from '../assets/hogwarts.jpeg';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);
    const [expandedBookId, setExpandedBookId] = useState(null);
    const [expandedMovieId, setExpandedMovieId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksResponse = await axios.get('https://api.potterdb.com/v1/books');
                const moviesResponse = await axios.get('https://api.potterdb.com/v1/movies');
                setBooks(booksResponse.data.data);
                setMovies(moviesResponse.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleBook = (id) => {
        setExpandedBookId(expandedBookId === id ? null : id);
    };

    const toggleMovie = (id) => {
        setExpandedMovieId(expandedMovieId === id ? null : id);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Hogwarts Crest Image at the Top */}
            <Image source={hogwartsCrest} style={styles.hogwartsCrest} />

            {/* Welcome Section */}
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Welcome to Potterhead App!</Text>
                <Text style={styles.welcomeSubtitle}>
                    Explore the world of Harry Potter and uncover secrets you never knew.
                </Text>
            </View>

            {/* Separator */}
            <View style={styles.sectionSeparator} />

            {/* Books Section */}
            <Text style={styles.title}>Books</Text>
            {books.map((item) => {
                const book = item.attributes;
                const isExpanded = expandedBookId === item.id;

                return (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => toggleBook(item.id)}>
                        <Text style={styles.bookTitle}>{book.title}</Text>
                        {isExpanded && (
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailText}>Author: J.K. Rowling</Text>
                                <Text style={styles.detailText}>Release Date: {book.released_on || 'Unknown'}</Text>
                                <Text style={styles.detailText}>Pages: {book.pages || 'N/A'}</Text>
                                <Text style={styles.detailText}>Dedication: {book.dedication || 'None'}</Text>
                                <Text style={styles.detailText}>Summary: {book.summary || 'No summary available.'}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}

            {/* Movies Section */}
            <View style={styles.sectionSeparator} />
            <Text style={styles.title}>Movies</Text>
            {movies.map((item) => {
                const movie = item.attributes;
                const isExpanded = expandedMovieId === item.id;

                return (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => toggleMovie(item.id)}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        {isExpanded && (
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailText}>Release Date: {movie.released_on || 'Unknown'}</Text>
                                <Text style={styles.detailText}>Box Office: {movie.box_office || 'N/A'}</Text>
                                <Text style={styles.detailText}>Budget: {movie.budget || 'N/A'}</Text>
                                <Text style={styles.detailText}>Rating: {movie.rating || 'N/A'}</Text>
                                <Text style={styles.detailText}>Summary: {movie.summary || 'No summary available.'}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: 'black', padding: 20, paddingTop: 30 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
    loadingText: { color: 'gold', fontSize: 18 },
    hogwartsCrest: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 10,
    },
    welcomeContainer: {
        backgroundColor: '#2E2E2E',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeTitle: {
        color: 'gold',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        color: 'lightgray',
        fontSize: 16,
        textAlign: 'center',
    },
    sectionSeparator: { height: 20 },
    title: { color: 'gold', fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
    card: { 
        backgroundColor: '#333', 
        borderRadius: 8, 
        marginBottom: 10, 
        padding: 15,
    },
    bookTitle: { 
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold', 
    },
    movieTitle: { 
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold', 
    },
    detailsContainer: {
        marginTop: 10,
        paddingLeft: 10,
    },
    detailText: {
        color: 'lightgray',
        fontSize: 14,
        marginBottom: 5,
    },
});

export default HomePage;
