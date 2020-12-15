import React from "react";

export default class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      like: false,
      willWatch: false,
    };
  }

  toggleOverview = () => {
    this.setState({ show: !this.state.show });
  };

  handleLike = () => {
    this.setState({ like: !this.state.like });
  };

  handleWillWatch = () => {
    this.setState({ willWatch: !this.state.willWatch });
  };

  render() {
    const {
      original_title,
      vote_average,
      adult,
      overview,
      release_date,
      id,
      backdrop_path,
      poster_path,
    } = this.props.movie;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
          alt=""
        />
        <div className="card-body">
          <p className="card-title">{original_title}</p>
          {this.state.show ? (
            <div>
              <p>Vote:{vote_average}</p>
              <p>Adult:{adult.toString()}</p>
              <p>Overview:{overview}</p>
              <p>Release:{release_date}</p>
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.toggleOverview}
            >
              {this.state.show ? "Hide" : "Show"}
            </button>
            <button
              type="button"
              onClick={this.handleLike}
              className={this.state.like ? "btn btn-danger" : "btn btn-primary"}
            >
              Like
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.props.removeMovie(id)}
            >
              Delete
            </button>
            <button
              type="button"
              className={
                this.state.willWatch ? "btn btn-success" : "btn btn-primary"
              }
              onClick={() => {
                this.handleWillWatch();
                this.props.changeMovieWillWatch(original_title);
              }}
            >
              Will watch
            </button>
          </div>
        </div>
      </div>
    );
  }
}
