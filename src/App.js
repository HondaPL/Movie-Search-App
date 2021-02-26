import React from 'react';
import './App.scss';

const STREAMING_API = process.env.REACT_APP_STREAMING_API_KEY;
const STREAMING_UK_API = process.env.REACT_APP_STREAMING_UK_API_KEY;
const OMDB_API = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_API_2 = process.env.REACT_APP_OMDB2_API_KEY;

class App extends React.Component {

  state = {
    // By default I added a movie so when you first load the application it will show it -> FROZEN <img class="emoji-icon" alt="emoji-smiley" data-icon="emoji-smiley" style="display: inline; margin: 0; margin-top: 1px; position: relative; top: 5px; width: 25px" src="data:image/png;base64, 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" title="emoji-smiley" />
    movies: ['tt1856101'],
    searchTerm: ''
};

search = event => {
    var axios = require("axios").default;
    event.preventDefault();
    axios
        .get(
            `https://www.omdbapi.com/?apikey=`+ OMDB_API +`&s=${
                this.state.searchTerm
            }&plot=full`
        )
        .then(res => res.data)
        .then(res => {
            if (!res.Search) {
                this.setState({ movies: [] });
                return;
            }

            const movies2 = res.Search.map(movie => movie.imdbID);
            const movies = Array.from(new Set(movies2));
            this.setState({
                movies
            });
        });
};

handleChange = event => {
    this.setState({
        searchTerm: event.target.value
    });
};

handleXMen = event => {
    this.setState({
        movies: ["tt0120903", "tt0290334", "tt0376994", "tt0458525", "tt1270798", "tt1430132", "tt1877832", "tt3385516", "tt1431045", "tt3315342", "tt5463162", "tt6565702", "tt4682266"]
    });
}

handleMarvel = event => {
    this.setState({
        movies: ["tt0371746", "tt0800080", "tt1228705", "tt0800369", "tt0458339", "tt0848228", 
        "tt1300854", "tt1981115", "tt1843866", "tt2015381", "tt2395427","tt0478970",
        "tt3498820", "tt1211837", "tt3896198", "tt2250912", "tt3501632", "tt1825683", "tt4154756", "tt5095030", "tt4154664", "tt4154796", "tt6320628",
        "tt9140560", "tt9208876", "tt3480822", "tt9140554", "tt9376612", "tt9032400", "tt10872600", "tt9419884", "tt10648342", "tt9114286", "tt10676048", "tt11213558", "tt6791350", "tt10671440", "tt10676052", "tt6263850"
    ]
    });
}

reloadPage = event => window.location.reload()

render() {
    const { movies } = this.state;
    return (
            <div className="wrap">
                <div className="title" onClick={this.reloadPage}>
                    Movie Search App
                </div>
                <div className="instruction">
                    <p>Search for your favorite movie, series or whatever you want.</p>
                </div>
                <div className="franchiseBox">
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleXMen} src="https://freepngimg.com/download/xmen/26266-8-x-men-clipart.png" alt="X-men"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleMarvel} src="https://d.newsweek.com/en/full/1394885/marvel-movie-release-dates-2020-2021-black-widow-avengers-endgame.png?w=1600&h=1600&q=88&f=8747f0e542149fcef456f0bfc750f50c" alt="Marvel"></img>
                </div>
                <img hidden="{true}" width="40px" height="40px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0cd82ff4-fa94-4020-9a16-f41089efc593/dd5d95n-46013979-82a8-4fae-ac31-fd4865a8d99d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMGNkODJmZjQtZmE5NC00MDIwLTlhMTYtZjQxMDg5ZWZjNTkzXC9kZDVkOTVuLTQ2MDEzOTc5LTgyYTgtNGZhZS1hYzMxLWZkNDg2NWE4ZDk5ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mL37S_siI4svhpddNLPe-E__VgYmMDwTea5XNYBGp0k" alt=""/>
                <img hidden="{true}" width="40px" height="40px" src="https://appforwin10.com/wp-content/uploads/2018/12/Amazon-Prime-Video-Free-Download-for-Windows-10.png" alt=""/>
                <img hidden="{true}" width="40px" height="40px" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" alt=""/>
            <div className="searchBox">
            <form onSubmit={this.search} role="search" className="search">
                <input
                    placeholder="Search for a movie"
                    onChange={this.handleChange}
                    className="searchTerm"
                    type="text"
                />
            </form>
            {movies.length > 0 ? (
                movies.map(movie => (
                    <MovieCard movieID={movie} key={movie} />
                ))
            ) : (
                <h1 className="error">
                    Couldn't find any movie. Please search again using
                    another search criteria.
                </h1>
            )}
      </div>
      <p className="credits">Created by Adam Hącia 2021</p>
    </div>
    );
}
}

class MovieCard extends React.Component {
  state = {
      movieData: {},
      streamingData: {},
      ukStreaming: {},
      working: "yes",
      ukWorking: "yes"
  };

  componentDidMount() {
    var axios = require("axios").default;

        axios
            .get(
                `https://www.omdbapi.com/?apikey=`+ OMDB_API_2 +`&i=${
                    this.props.movieID
                }`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
            

          
  }

  checkAvaiblity = event => {
    var unirest = require("unirest");

    event.preventDefault();

    var req = unirest("GET", "https://streaming-availability.p.rapidapi.com/get/basic");
    var req2 = unirest("GET", "https://streaming-availability.p.rapidapi.com/get/basic");

    
    req.query({
        "country": "pl",
        "imdb_id": this.props.movieID
    });

    req.headers({
        "x-rapidapi-key": STREAMING_API,
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    req.end(res => {
        if (res.error) {
            this.setState({working: "no"});
        } else {
        const bodyJSON = JSON.parse(res.body);
        this.setState({streamingData: bodyJSON})
        }
    });

    req2.query({
        "country": "gb",
        "imdb_id": this.props.movieID
    });
    req2.headers({
        "x-rapidapi-key": STREAMING_UK_API,
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    req2.end(res2 => {
        if (res2.error) {
            this.setState({ukWorking: "no"});
            return;
        }
        const bodyJSON2 = JSON.parse(res2.body);
        this.setState({ukStreaming: bodyJSON2})
    });
  }


  render() {
      const {
          Title,
          Released,
          Genre,
          Plot,
          Poster,
          imdbRating,
          Director,
          Runtime,
          imdbID,
          Ratings,
          Type,
          Metascore
      } = this.state.movieData;

      const {
        streamingInfo,
      } = this.state.streamingData;

      let ukStreaming = "";
      ukStreaming = this.state.ukStreaming.streamingInfo;
      let netflix = "";
      let prime = "";
      let disney = "";


      if(streamingInfo) {
          if(streamingInfo.netflix){
            netflix = streamingInfo.netflix.pl.link;
          }
          if(streamingInfo.prime){
            prime = streamingInfo.prime.pl.link;
          }
      }
      if(ukStreaming) {
        if(ukStreaming.disney){
            disney = ukStreaming.disney.gb.link;
          }
      }

      if (!Poster || Poster === 'N/A') {
          return null;
      }

      let color = "";

      if (Type === "series") {
        color = "ave";
      } else if(Type === "movie"){
        color = "bright"
        }else {
        color = "tomb";
      }

      let tomato = "";
      let ranking = 0;

      if (!Ratings || Ratings.length<2 || Ratings[1].Source !== "Rotten Tomatoes") {
            tomato = "https://cdn2.iconfinder.com/data/icons/food-vegetables-grey/64/Vegetable_Tomato-512.png";
            ranking = 'None';
      } else if(Ratings[1].Value[0]>5 || Ratings[1].Value.length === 4){
        tomato = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/1009px-Rotten_Tomatoes.svg.png";
        ranking = Ratings[1].Value;
      } else {
          tomato = "https://www.pinclipart.com/picdir/big/266-2667132_file-rotten-tomatoes-wikimedia-clipart.png";
          ranking = Ratings[1].Value;
      }

      return (
        <div className="movie_card" id={color}>
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina" src={Poster} alt="Poster NA"/>
                    <h1>{Title}</h1>
                    <h4>{Released}, {Director}</h4>
                    
                </div>
                <div className="movie_social">
                <span className="minutes">{Runtime}</span>
                    <span className="rating">{imdbRating !== "N/A" ? imdbRating + "/10" : 'N/A'} <img width="30px" height="13px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png" alt=" "></img></span>
                    <span className="rating">{ranking} <img width="16px" height="16px" src={tomato} alt=" "></img></span>
                    <span className="rating">{
                        Metascore !== "N/A" ? Metascore : 'N/A'
                        } <img width="16px" height="16px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png" alt=" "></img></span>
                    <br></br>
                    <p className="type">{Genre && Genre.split(', ').map(g => <span className="type">{g}</span>)}</p>
                </div>
                <div className="movie_desc">
                    <p className="text">
                        {Plot}
                    </p>
                    
                </div>
                <div className="movie_social">
                    <ul>
                        <li><a href={"https://www.imdb.com/title/" + imdbID + "/"}><img  width="70px" height="40px" src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png" alt=""/></a></li>
                        {/* <li><a href={"https://upflix.pl/film/zobacz/" + Title.replace(/\s+/g, '-').replace(':','') + "-" + Released.substr(-4)}><img  width="100px" height="25px" src="https://assets.upflix.pl/dist/img/logo.png" /></a></li> */}
                        <li><a href={"https://trakt.tv/search/imdb/" + imdbID + "/"}><img  width="40px" height="40px" src="https://walter.trakt.tv/hotlink-ok/public/favicon.png" alt=""/></a></li>
                        {
                            !streamingInfo && this.state.working === 'yes' && (Type === "movie" || Type === "series")
                            ? <li><button className="button minutes" value={imdbID} onClick={this.checkAvaiblity}>Streaming?</button></li>
                            : ""
                        }
                        {/* { streamingInfo.netflix.pl.link && streamingInfo.netflix.pl.link.length > 0  */}
                            {/* ? <li><a href={"https://trakt.tv/search/imdb/" + imdbID + "/"}><img  width="40px" height="40px" src="https://walter.trakt.tv/hotlink-ok/public/favicon.png" alt=""/></a></li> */}
                            {/* : "" */}
                        {/* } */}
                        {
                            netflix.length > 0 
                            ? <li><a href={netflix}><img  width="40px" height="40px" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" alt=""/></a></li>
                            : ""
                        }
                        {
                            prime.length > 0 
                            ? <li><a href={prime}><img  width="40px" height="40px" src="https://appforwin10.com/wp-content/uploads/2018/12/Amazon-Prime-Video-Free-Download-for-Windows-10.png" alt=""/></a></li>
                            : ""
                        }
                        {
                            disney.length > 0 
                            ? <li><a href={disney}><img  width="40px" height="40px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0cd82ff4-fa94-4020-9a16-f41089efc593/dd5d95n-46013979-82a8-4fae-ac31-fd4865a8d99d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMGNkODJmZjQtZmE5NC00MDIwLTlhMTYtZjQxMDg5ZWZjNTkzXC9kZDVkOTVuLTQ2MDEzOTc5LTgyYTgtNGZhZS1hYzMxLWZkNDg2NWE4ZDk5ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mL37S_siI4svhpddNLPe-E__VgYmMDwTea5XNYBGp0k" alt=""/></a></li>
                            : ""
                        }
                        {
                            this.state.working === 'no'
                            ? <li className="availability">Option not available.<br></br> Try again tommorow</li>
                            : ""
                        }
                    </ul>
                </div>
            </div>
            <div className="blur_back" style={{ 
                backgroundImage: `url(`+ Poster +`)` 
                }}>
            </div>
        </div>
      );
  }
}
export default App;
