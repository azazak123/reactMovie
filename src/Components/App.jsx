import React from "react";
import "../styles.css";
import MovieTabs from "./MovieTabs";
import MovieItem from "./MovieItem";
import MoviePage from "./MoviePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_KEY_3, API_URL } from "../utils";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: new Set(),
      sort_by: "popularity.desc",
      page: 1,
      total_pages: 0,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sort_by !== prevState.sort_by) {
      this.getMovies();
    } else if (this.state.page !== prevState.page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`
    )
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          movies: result.results,
          page: result.page,
          total_pages: result.total_pages,
        })
      );
  };

  updateSortBy = (value) => {
    this.setState({ sort_by: value });
  };

  updatePage = (value) => {
    this.setState({ page: value });
  };

  removeMovie = (id) => {
    this.setState({
      movies: this.state.movies.filter((item) => item.id !== id),
    });
  };

  changeMovieWillWatch = (title) => {
    const updateMovies = new Set(this.state.moviesWillWatch.values());
    if (!updateMovies.has(title)) {
      updateMovies.add(title);
      this.setState({
        moviesWillWatch: updateMovies,
      });
    } else {
      updateMovies.delete(title);
      this.setState({
        moviesWillWatch: updateMovies,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((movie) => (
                <div className="col mb-4" key={movie.id}>
                  <MovieItem
                    movie={movie}
                    removeMovie={this.removeMovie}
                    changeMovieWillWatch={this.changeMovieWillWatch}
                  />
                </div>
              ))}
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <MoviePage
                  total_pages={this.state.total_pages}
                  page={this.state.page}
                  updatePage={this.updatePage}
                />
              </div>
            </div>
          </div>
          <div className="col-3">
            <p>Will watch: {this.state.moviesWillWatch.size}</p>
            {[...this.state.moviesWillWatch].map((title) => (
              <p key={title}>{title}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
