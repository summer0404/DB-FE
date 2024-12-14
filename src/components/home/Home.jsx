import { useEffect, useState } from 'react';
import { getAllMovie } from '../../service/home';
import NavBar from '../navbar/NavBar';
import LandingPage from './LandingPage';
import PopularMovies from './PopularMovies';

export default function HomePage() {
  const [movieData, setMovieData] = useState([]);
  const getMovies = async () => {
    const movies = await getAllMovie();
    console.log(movies)
    setMovieData(movies);
  } 
  
  useEffect(() => {
    getMovies();
  }, []);
  
  return (
        <div style={{ padding: '20px', backgroundColor: 'black' }}>

            <LandingPage />
            <div style={{ marginTop: '20px' }}>
                <PopularMovies title="Phim nổi bật" movies={movieData} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <PopularMovies title="Kinh dị" movies={movieData} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <PopularMovies title="Hành động" movies={movieData} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <PopularMovies title="Hoạt hình" movies={movieData} />
            </div>
        </div>
    )
}
  