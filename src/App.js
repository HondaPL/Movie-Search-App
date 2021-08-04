import React from 'react';
import './App.scss';

const STREAMING_API = process.env.REACT_APP_STREAMING_API_KEY;
const STREAMING_UK_API = process.env.REACT_APP_STREAMING_UK_API_KEY;
const OMDB_API = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_API_2 = process.env.REACT_APP_OMDB2_API_KEY;

class App extends React.Component {

  state = {
    movies: ['tt1856101'],
    searchTerm: '',
    view: "normal",
    franchise: "no",
    more: "no",
    page: 1,
    error: null,
    total: null
};

getMore = event => {
    this.setState({
        more: "yes",
    })
    this.search()
}

search = event => {
    var axios = require("axios").default;
    // console.log(this.state.page)
    if(event) {
        event.preventDefault();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.page = 1
    }
    else 
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.page++
    axios
        .get(
            `https://www.omdbapi.com/?apikey=`+ OMDB_API +`&s=${
                this.state.searchTerm
            }&plot=full&page=` + this.state.page
        )
        .then(res => res.data)
        .then(res => {
            // console.log(res)
            // console.log(res.totalResults)
            // console.log(res.Error)
            if (!res.Search) {
                if(this.state.more === "no") {
                    this.setState({ 
                        movies: [] ,
                        error : res.Error,
                    });
                } else {
                    this.setState({ 
                        error : res.Error,
                    }); 
                }
                return;
            } else {
                this.setState({ 
                    total: res.totalResults,
                    error : null
                }); 
            }

            const movies2 = res.Search.map(movie => movie.imdbID);
            // console.log(movies2)
            const movies = Array.from(new Set(movies2));
            this.state.more === "yes" ? (
            this.setState({
                movies: [...this.state.movies, ...movies],
                franchise: "no"
            })
        ) : (this.setState({
            movies : movies,
            franchise: "no"
        }));
        this.setState({
            more: "no",
        })

        });
};

handleChange = event => {
    this.setState({
        searchTerm: event.target.value ? event.target.value : this.state.searchTerm
    });
};

handleXMen = event => {
    this.setState({
        movies: ["tt0120903", "tt0290334", "tt0376994", 
        "tt0458525", "tt1270798", "tt1430132", 
        "tt1877832", "tt1431045","tt3385516", 
        //Legion
        "tt5114356",
        "tt3315342", "tt4396630"
        //Gifted
        ,"tt5463162",
        "tt6565702", "tt4682266"
        ],
        franchise: "yes",
        more: "no",
        total: 0
    });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.page = 1
}

handleNolan = event => {
    this.setState({
        movies: ["tt0154506", "t0209144","tt0278504",
        ],
        franchise: "yes",
        more: "no",
        total: 0
    });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.page = 1
}

handleSony = event => {
    this.setState({
        movies: ["tt1270797", "tt7097896","tt5108870", "tt8790086"
        ],
        franchise: "yes",
        more: "no",
        total: 0
    });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.page = 1
}

handleMarvel = event => {
    this.setState({
        movies: [
            /*First phase*/
            "tt0371746", "tt0800080", "tt1228705", "tt0800369", "tt0458339", "tt0848228", 
            /*Second phase*/
            "tt1300854", "tt1981115", "tt1843866", "tt2015381", "tt2395427","tt0478970",
            /*Third phase*/
            "tt3498820", "tt1211837", "tt3896198", "tt2250912", "tt3501632", "tt1825683", 
            "tt4154756", "tt5095030", "tt4154664", "tt4154796", "tt6320628",
            /*Fourth phase 2021* 
WandaVision, The Falcon and the Winter Soldier, Loki, Black Widow, What If…?, 
Shang-Chi and the Legend of the Ten Rings, Ms. Marvel, Hawkeye, The Eternals, Spider-Man: No Way Home*/
            "tt9140560", "tt9208876",  "tt9140554", "tt3480822","tt10168312", "tt9376612",  
            "tt9032400","tt10160804", "tt10872600", "tt10857164",
            /*Fourth phase 2022
            Doctor Strange in the Multiverse of Madness, Thor: Love and Thunder, Black Panther 2
Captain Marvel 2, Ant-Man and the Wasp: Quantumania, */
            "tt9419884", "tt10648342", "tt9114286", 
            "tt10676048", "tt11213558",
            /*Guardians of the Galaxy Holiday Special, She-Hulk, 
            Moon Knight, Guardians of the Galaxy 3, Blade, Fantastic Four, 
            Deadpool 3, Ironheart, Armor Wars, Secret Invasion, I Am Groot,*/
            "tt13623136", "tt10857160","tt10234724", 
            "tt6791350", "tt10671440", 
            "tt10676052", "tt6263850", "tt13623126",
            "tt13623128", "tt13157618", "tt13623148",
            /*Chyba UWS? i ECHO? i CA4*/"tt13968252", "tt13966962", "tt14513940"
            /*BRAK Mutants, */
        ],
        franchise: "yes",
        more: "no",
        total: 0
    });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.page = 1
}

handleStarWars = event => {
    this.setState({
        movies: ["tt0076759", "tt0193524", "tt0080684", "tt0086190", "tt0088510", "tt0088515",
         "tt0120915", "tt0121765","tt0361243", "tt0121766",
         "tt1185834", "tt0458290", "tt2930604",
        "tt2488496", "tt3748528","tt11281500", "tt6779076", //FOD
        "tt2527336", "tt3778644", "tt8336340", "tt9353248", "tt10799452", "tt8111088", //Mando
        "tt2527338", "tt12708542", "tt13622982", "tt13668894", //Book of Boba
        "tt9253284", "tt8466564", "tt12262202", "tt13622776", "tt13622996", "tt13622774", "tt10300394"
        ],
        franchise: "yes",
        more: "no",
        total: 0
    });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.page = 1
}

handleDCEU = event => {
    this.setState({
        movies: ["tt0770828","tt2975590","tt1386697",
        "tt0451279","tt0974015","tt1477834",
        "tt0448115","tt7286456","tt7713068",
        "tt7126948","tt12361974","tt6334354",
        "tt13146488", //Peacemaker
        "tt1877830", //Batman
        "tt6443346","tt0439572","tt9663764",
        "tt10151854"
        ],
        franchise: "yes",
        more: "no",
        total: 0
    });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.page = 1
}

handleView = event => this.state.view === "normal" ? this.setState({ view: "grid" }) : this.setState({ view: "normal" })

reloadPage = event => window.location.reload()

render() {
    let { movies, view } = this.state;
    // console.log(this.state.error)
    // console.log(this.state)
    // console.log("Liczba filmow" + this.state.movies.length)
    movies = Array.from(new Set(movies));
    return (
            <div className="wrap">
                <div className="title" onClick={this.reloadPage}>
                    Movie Search App
                </div>
                <div className="instruction">
                    <p>Search for your favorite movie, series or whatever you want. 
                        <button onClick={this.handleView} className="square_btn">Change view</button>
                    </p>
                </div>
                <div className="franchiseBox">
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleXMen} src="https://freepngimg.com/download/xmen/26266-8-x-men-clipart.png" alt="X-men"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleMarvel} src="https://d.newsweek.com/en/full/1394885/marvel-movie-release-dates-2020-2021-black-widow-avengers-endgame.png?w=1600&h=1600&q=88&f=8747f0e542149fcef456f0bfc750f50c" alt="Marvel"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleStarWars} src="https://i.etsystatic.com/14403810/r/il/047211/1197150509/il_570xN.1197150509_hg99.jpg" alt="Star Wars"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleDCEU} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/600px-DC_Comics_logo.svg.png" alt="DCEU"></img>
                    <img className="franchise" width="40px" heigh="40px" onClick={this.handleSony} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F15492164%2Fr%2Fil%2Fad4d14%2F1908914624%2Fil_fullxfull.1908914624_knuz.jpg&f=1&nofb=1" alt="NOLAN"></img>
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
            <div className="listOfMovies">
            {movies.length > 0 ? (
                this.state.franchise === "yes" ? (
                    movies
                    .map(movie => {
                        return <MovieCard movieID={movie} key={movie} view={view}/>
                    })
            )
                    :
                    movies
                    .map(movie => (
                        <MovieCard movieID={movie} key={movie} view={view} />
                    ))
            ) : (
                <h1 className="error">
                    {this.state.error}
                    {/* Couldn't find any movie. Please search again using
                    another search criteria. */}
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
          Year,
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
          Metascore,
          Rated,
          totalSeasons
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

      let message = "Check\n Streaming"

      if (!Ratings || Ratings.length<2 || Ratings[1].Source !== "Rotten Tomatoes") {
            tomato = "https://cdn2.iconfinder.com/data/icons/food-vegetables-grey/64/Vegetable_Tomato-512.png";
            ranking = 'N/A';
      } else if(Ratings[1].Value[0]>5 || Ratings[1].Value.length === 4){
        tomato = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/1009px-Rotten_Tomatoes.svg.png";
        ranking = Ratings[1].Value;
      } else {
          tomato = "https://www.pinclipart.com/picdir/big/266-2667132_file-rotten-tomatoes-wikimedia-clipart.png";
          ranking = Ratings[1].Value;
      }

    //   console.log(this.props.view);
    //   console.log(this.props.movieID);
    //   console.log(this.props.key);

      return (
        <div className={this.props.view === "grid" ? "movie_card2" : "movie_card"} id={color}>
            <div className={this.props.view !== "grid" ? "info_section" : "info_section info_section2"}>
                <div className={this.props.view !== "grid" ? "movie_header" : "movie_header movie_header2"}>
                    <img className="locandina" src={Poster} alt="Poster NA"/>
                    <h2>{Title}</h2>
                    <h4>{Type === "series" ? Year : Released}{Director === 'N/A' ? "": ", "+Director}</h4>
                    <h4>{totalSeasons ? "Seasons: " + totalSeasons : "" }</h4>
                    {/* <span className="ratingInfo">{Rated}</span> */}
                </div>
                <div className="movie_social">
                <span className="minutes">{Runtime}</span>
                <span className="ratingInfo">{Rated}</span>
                <br></br>
                    <span className="minutes">{imdbRating !== "N/A" ? imdbRating + "/10" : 'N/A'} <img width="30px" height="13px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png" alt=" "></img></span>
                    <span className="rating">{ranking} <img width="16px" height="16px" src={tomato} alt=" "></img></span>
                    <span className="rating">{
                        Metascore !== "N/A" ? Metascore : 'N/A'
                        } <img width="16px" height="16px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png" alt=" "></img></span>
                    <br></br>
                    <span className="typeBox">{Genre && Genre.split(', ').map(g => <span className="type">{g}</span>)}</span>
                </div>
                <div className={this.props.view !== "grid" ? "movie_desc" : "movie_desc movie_desc2"}>
                    <p className="text">
                        {Plot}
                    </p>
                    
                </div>
                
                <div className="movie_social">
                    <ul>
                        {imdbID ? <li><a href={"https://www.imdb.com/title/" + imdbID + "/"}><img  width="70px" height="40px" src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png" alt=""/></a></li> : ""}
                        {/* <li><a href={"https://upflix.pl/film/zobacz/" + Title.replace(/\s+/g, '-').replace(':','') + "-" + Released.substr(-4)}><img  width="100px" height="25px" src="https://assets.upflix.pl/dist/img/logo.png" /></a></li> */}
                        {imdbID ? <li><a href={"https://trakt.tv/search/imdb/" + imdbID + "/"}><img  width="40px" height="40px" src="https://walter.trakt.tv/hotlink-ok/public/favicon.png" alt=""/></a></li> : ""}
                        {Date.now() > Date.parse(Released) ?
                        <>
                        {
                            !streamingInfo && this.state.working === 'yes' && (Type === "movie" || Type === "series")
                            ? <li className="streamBox"><button heigh="40px" width="100px" className="square_btn stream" value={imdbID} onClick={this.checkAvaiblity}>{message}</button></li>
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
                        </>
                        : ""} 
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
