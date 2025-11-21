import { Component } from "react";
import Footer from "./Footer";
import Loader from "./Loader";

class Main extends Component {
  state = {
    trendingNow: [],
    watchAgain: [],
    newReleases: [],
    loading: true,
  };

  americanPie = "American%20Pie";
  interstellar = "Interstellar";
  starWars = "Star%20Wars";
  URL = `https://www.omdbapi.com/?apikey=b4fec95c&s=`;

  fetchMovies = (query, category) => {
    fetch(this.URL + query)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        return this.setState({ [category]: data.Search, loading: false });
      })
      .catch((e) => {
        console.log(`Abbiamo un errore: ${e}`);
      });
  };
  componentDidMount() {
    this.fetchMovies(this.americanPie, "trendingNow");
    this.fetchMovies(this.interstellar, "watchAgain");
    this.fetchMovies(this.starWars, "newReleases");
  }

  render() {
    return (
      <div>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-4">TV Shows</h2>
              <div className="btn-group" role="group">
                <div className="dropdown ms-4 mt-1">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm dropdown-toggle rounded-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#221f1f" }}>
                    Genres
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Comedy
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Drama
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Thriller
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <i className="bi bi-grid icons"></i>
              <i className="bi bi-grid-3x3 icons"></i>
            </div>
          </div>
          <h4>Trending Now</h4>
          <div className="scroll-row mb-4">
            {this.state.loading && <Loader></Loader>}
            {this.state.trendingNow.map((movie) => (
              <div className="col-auto text-center px-1" key={movie.imdbID}>
                <img
                  className="netflix-card"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
            ))}
          </div>
          *<h4>Watch it Again</h4>
          <div className="scroll-row mb-4">
            {this.state.loading && <Loader></Loader>}
            {this.state.watchAgain.map((movie) => (
              <div className="col-auto text-center px-1" key={movie.imdbID}>
                <img
                  className="netflix-card"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
            ))}
          </div>
          <h4>New Releases</h4>
          {this.state.loading && <Loader></Loader>}
          <div className="scroll-row mb-4">
            {this.state.newReleases.map((movie) => (
              <div className="col-auto text-center px-1" key={movie.imdbID}>
                <img
                  className="netflix-card"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
            ))}
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Main;
