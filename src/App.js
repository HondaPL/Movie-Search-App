/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import './App.scss';
import { alien, dceu, mcu, nolan, sony, starWars, xMen } from './data/data'
import MovieCard from './components/MovieCard'

const aws = require('aws-sdk');

let secret = new aws.S3({
  omdb: process.env.REACT_APP_OMDB_API_KEY
});

class App extends React.Component {

    state = {
        movies: ['tt1856101'],
        searchTerm: '',
        view: "normal",
        franchise: "no",
        more: "no",
        page: 1,
        error: null,
        total: null,
        streamingCode: "pl"
    };

    getMore = () => {
        this.setState({
            more: "yes",
        })
        this.search()
    }

    search = event => {
        var axios = require("axios").default;
        if (event) {
            event.preventDefault();
            this.state.page = 1
        }
        else
            this.state.page++
        axios
            .get(
                `https://www.omdbapi.com/?apikey=` + secret.omdb + `&s=${this.state.searchTerm
                }&plot=full&page=` + this.state.page
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.state.more === "no"
                        ? this.setState({ movies: [], error: res.Error })
                        : this.setState({ error: res.Error })
                    return;
                } else this.setState({ total: res.totalResults, error: null })

                const movies = Array.from(new Set(res.Search.map(movie => movie.imdbID)));

                this.setState({
                    movies: this.state.more === "yes" ? [...this.state.movies, ...movies] : movies,
                    franchise: "no",
                    more: "no"
                })
            });
    };

    handleChange = event =>
        this.setState({ searchTerm: event.target.value ? event.target.value : this.state.searchTerm });

    handleFranchise = type => {
        this.setState({
            movies: type,
            franchise: "yes",
            more: "no",
            total: 0
        });
        this.state.page = 1
    }

    handleView = () =>
        this.state.view === "normal" ? this.setState({ view: "grid" }) : this.setState({ view: "normal" })

    handleStreaming = event => {
        this.setState({ streamingCode: event.target.value , more: "no", total: 0 })
}

    render() {

        let { movies, view, streamingCode } = this.state;
        movies = Array.from(new Set(movies));

        return (
            <div className="wrap">
                <div className="title" onClick={() => window.location.reload()}>
                    Movie Search App
                </div>
                <div className="instruction">
                    <button onClick={this.handleView} className="square_btn">Change view</button>
                    <br />Check streaming for:
                    <form>
                        <label class="radio-inline">
                            <input type="radio" name="country_radio" value="pl" onClick={this.handleStreaming} defaultChecked/>Poland
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="country_radio" value="gb" onClick={this.handleStreaming} />United Kingdom
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="country_radio" value="de" onClick={this.handleStreaming} />Germany
                        </label>
                    </form>
                </div>
                <div className="franchiseBox">
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(xMen)} src="https://freepngimg.com/download/xmen/26266-8-x-men-clipart.png" alt="X-men"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(mcu)} src="https://d.newsweek.com/en/full/1394885/marvel-movie-release-dates-2020-2021-black-widow-avengers-endgame.png?w=1600&h=1600&q=88&f=8747f0e542149fcef456f0bfc750f50c" alt="Marvel"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(starWars)} src="https://i.etsystatic.com/14403810/r/il/047211/1197150509/il_570xN.1197150509_hg99.jpg" alt="Star Wars"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(dceu)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/600px-DC_Comics_logo.svg.png" alt="DCEU"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(sony)} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F15492164%2Fr%2Fil%2Fad4d14%2F1908914624%2Fil_fullxfull.1908914624_knuz.jpg&f=1&nofb=1" alt="NOLAN"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(nolan)} src="https://img.ecartelera.com/noticias/40600/40601-m.jpg" alt="NOLAN"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={() => this.handleFranchise(alien)} src="https://cdnb.artstation.com/p/assets/images/images/003/916/367/large/anne-louise-marquart-carlsson-xenomorph-logotingy.jpg?1498169101" alt="ALIEN"></img>
                </div>
                <img hidden="{true}" width="40px" height="40px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0cd82ff4-fa94-4020-9a16-f41089efc593/dd5d95n-46013979-82a8-4fae-ac31-fd4865a8d99d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMGNkODJmZjQtZmE5NC00MDIwLTlhMTYtZjQxMDg5ZWZjNTkzXC9kZDVkOTVuLTQ2MDEzOTc5LTgyYTgtNGZhZS1hYzMxLWZkNDg2NWE4ZDk5ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mL37S_siI4svhpddNLPe-E__VgYmMDwTea5XNYBGp0k" alt="" />
                <img hidden="{true}" width="40px" height="40px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0257%2F6087%2Fproducts%2F0295e70b9228cadd53efaba6a4f5b229.png%3Fv%3D1556497087&f=1&nofb=1" alt="" />
                <img hidden="{true}" width="40px" height="40px" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" alt="" />
                <div className="searchBox">
                    <form class="search__container" onSubmit={this.search}>
                        <p class="search__title">
                            Search for your favorite movie, series or whatever you want.
                        </p>
                        <input onChange={this.handleChange} class="search__input" type="text" placeholder="Search" />
                    </form>

                    <div className="listOfMovies">
                        {movies.length > 0 ? (
                            movies
                                .map(movie => {
                                    return <MovieCard movieID={movie} key={movie} view={view} streamingCode={streamingCode}/>
                                })
                        )
                            :
                            (
                                <h1 className="error">
                                    {this.state.error}
                                </h1>
                            )}
                    </div>
                    {this.state.movies.length < this.state.total && !this.state.error ?
                        <div className="listOfMovies">
                            <button onClick={this.getMore} className="square_btn">Load More</button>
                        </div>
                        :
                        ""}
                </div>
                <p className="credits">Created by Adam Hącia 2021</p>
            </div>
        );
    }
}
export default App;
