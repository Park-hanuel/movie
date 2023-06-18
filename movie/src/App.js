import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    };
    getMovies = async() => {
        const {
            data: {
                data :{movies}
            }
        } = await axios.get("https:yts-proxy.now.sh/list_movies.json?sort_by=rating");
        this.setState({ movies, isLoading: false});
    }; // getMovies에서 axios.get은 완료되기까지 시간이 조금 필요하기 때문에 await를 넣기
    componentDidMount(){
        this.getMovies();
    }
    render() {
        const { isLoading, movies }=this.state;
        return (
        <section className="container">
            {isloading ? (
             <div className="loader">
                <span className="loader__text">Loading...</span>
                </div>
            ) : (
                <div className="movies">
                    {movies.map(movie => (
                        <Movie 
                            key={movie.id}
                            id={movie.id} 
                            year={movie.year} 
                            title={movie.title} 
                            summary={movie.summary} 
                            poster={movie.medium_cover_image} 
                            genres={movie.genres}
                        />
                    ) 
                )
                    }</div>)}</section>
    )
 } // API로부터 데이터를 가져오는 중
}

export default App;