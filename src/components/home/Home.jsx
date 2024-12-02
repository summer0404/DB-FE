import NavBar from '../navbar/NavBar';
import LandingPage from './LandingPage';
import PopularMovies from './PopularMovies';

export default function HomePage() {
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

// Sample Movie Data
const movieData = [
    {
      img: "src/assets/movie_poster.jpg",
      title: "Venom: The Last Dance",
      genre: "Science Fiction, Action, Adventure",
    },
    {
      img: "src/assets/Spider_moviePoster.jpg",
      title: "Smile 2",
      genre: "Horror, Mystery",
    },
    {
      img: "src/assets/love_poster.jpeg",
      title: "Moana 2",
      genre: "Animation, Adventure, Family, Comedy",
    },
    {
      img: "src/assets/Spider_moviePoster.jpg",
      title: "The Wild Robot",
      genre: "Animation, Science Fiction, Family",
    },
    {
      img: "src/assets/movie_poster.jpg",
      title: "Gladiator II",
      genre: "Action, Adventure",
    },
    {
      img: "src/assets/Spider_moviePoster.jpg",
      title: "Wicked",
      genre: "Musical",
    },
    {
      img: "src/assets/movie_poster.jpg",
      title: "Terrifier 3",
      genre: "Horror",
    },
    {
      img: "src/assets/love_poster.jpeg",
      title: "Apocalypse Z: The Beginning",
      genre: "Action, Adventure",
    },
    {
      img: "src/assets/movie_poster.jpg",
      title: "Matka",
      genre: "Crime, Thriller",
    },
    {
      img: "src/assets/Spider_moviePoster.jpg",
      title: "Levels",
      genre: "Action, Thriller",
    },
  ];
  