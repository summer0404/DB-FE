import React, { useState, useEffect } from "react";
import NavBar from '../navbar/NavBar';
import LandingPage from './LandingPage';
import PopularMovies from './PopularMovies';
import {getAllMovies} from '../../api/movies.api';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await getAllMovies();
                console.log("response", response);
                if (response.success && response.data) {
                    setMovies(response.data);
                } else {
                    setError(response.message || "Failed to fetch movies");
                }
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("An error occurred while fetching movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Categorize movies by their first genre
    const categorizeMovies = (moviesList) => {
        return moviesList.reduce((acc, movie) => {
            const genre = movie.genres && movie.genres.length > 0 ? movie.genres[0].genre : "Others";
            if (!acc[genre]) {
                acc[genre] = [];
            }
            acc[genre].push({
                title: movie.name,
                img: movie.files && movie.files.length > 0 ? movie.files[0].path : "",
            });
            return acc;
        }, {});
    };

    const categorizedMovies = categorizeMovies(movies);
    console.log("categorizedMovies", categorizedMovies);
    return (
        <div style={{ padding: '20px', backgroundColor: 'black' }}>
            <LandingPage />

            {loading && (
                <div style={{ color: 'white', marginTop: '20px' }}>
                    Loading movies...
                </div>
            )}

            {error && (
                <div style={{ color: 'red', marginTop: '20px' }}>
                    {error}
                </div>
            )}

            {!loading && !error && Object.keys(categorizedMovies).map((genre) => (
                <div key={genre} style={{ marginTop: '20px' }}>
                    <PopularMovies title={genre} movies={categorizedMovies[genre]} />
                </div>
            ))}
        </div>
    );
}