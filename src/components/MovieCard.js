import React from 'react';
import '../App.scss'
class MovieCard extends React.Component {
    state = {
        movieData: {},
        streamingData: {},
        working: "yes",
        currentCode: ""
    };

    componentDidMount() {
        var axios = require("axios").default;

        axios
            .get(
                `https://www.omdbapi.com/?apikey=` + process.env.REACT_APP_OMDB2_API_KEY + `&i=${this.props.movieID
                }`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
    }

    checkAvailability = event => {
        var unirest = require("unirest");

        event.preventDefault();

        var req = unirest("GET", "https://streaming-availability.p.rapidapi.com/get/basic");

        req.query({
            "country": this.props.streamingCode,
            "imdb_id": this.props.movieID
        });

        this.setState({ currentCode: this.props.streamingCode })

        req.headers({
            "x-rapidapi-key": [process.env.REACT_APP_STREAMING_API_KEY, process.env.REACT_APP_STREAMING_UK_API_KEY][Math.floor(Math.random() * [process.env.REACT_APP_STREAMING_API_KEY, process.env.REACT_APP_STREAMING_UK_API_KEY].length)],
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "useQueryString": true
        });


        req.end(res => {
            res.error
                ? this.setState({ working: "no" })
                : this.setState({ streamingData: JSON.parse(res.body) })
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

        let {
            streamingInfo,
        } = this.state.streamingData;

        let netflix = "";
        let prime = "";
        let disney = "";
        let apple = "";

        if (this.state.currentCode !== this.props.streamingCode) {
            streamingInfo = null
        }

        if (streamingInfo && this.props.streamingCode === "pl") {
            if (streamingInfo.netflix && streamingInfo.netflix.pl) {
                netflix = streamingInfo.netflix.pl.link;
            }
            if (streamingInfo.prime && streamingInfo.prime.pl) {
                prime = streamingInfo.prime.pl.link;
            }
            if (streamingInfo.disney && streamingInfo.disney.pl) {
                disney = streamingInfo.disney.pl.link;
            }
            if (streamingInfo.apple && streamingInfo.apple.pl) {
                apple = streamingInfo.apple.pl.link;
            }
        }
        if (streamingInfo && this.props.streamingCode === "gb") {
            if (streamingInfo.netflix && streamingInfo.netflix.gb) {
                netflix = streamingInfo.netflix.gb.link;
            }
            if (streamingInfo.prime && streamingInfo.prime.gb) {
                prime = streamingInfo.prime.gb.link;
            }
            if (streamingInfo.disney && streamingInfo.disney.gb) {
                disney = streamingInfo.disney.gb.link;
            }
            if (streamingInfo.apple && streamingInfo.apple.gb) {
                apple = streamingInfo.apple.gb.link;
            }
        }
        if (streamingInfo && this.props.streamingCode === "de") {
            if (streamingInfo.netflix && streamingInfo.netflix.de) {
                netflix = streamingInfo.netflix.de.link;
            }
            if (streamingInfo.prime && streamingInfo.prime.de) {
                prime = streamingInfo.prime.de.link;
            }
            if (streamingInfo.disney && streamingInfo.disney.de) {
                disney = streamingInfo.disney.de.link;
            }
            if (streamingInfo.apple && streamingInfo.apple.de) {
                apple = streamingInfo.apple.de.link;
            }
        }
        if (!Title || Title === 'N/A') {
            return null;
        }

        let color = "";

        if (Type === "series") {
            color = "ave";
        } else if (Type === "movie") {
            color = "bright"
        } else {
            color = "tomb";
        }

        let tomato = "";
        let ranking = 0;

        if (!Ratings || Ratings.length < 2 || Ratings[1].Source !== "Rotten Tomatoes") {
            tomato = "https://cdn2.iconfinder.com/data/icons/food-vegetables-grey/64/Vegetable_Tomato-512.png";
            ranking = 'N/A';
        } else if ((Ratings[1].Value[0] > 5 && Ratings[1].Value.length > 2) || Ratings[1].Value.length === 4) {
            tomato = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/1009px-Rotten_Tomatoes.svg.png";
            ranking = Ratings[1].Value;
        } else {
            tomato = "https://www.pinclipart.com/picdir/big/266-2667132_file-rotten-tomatoes-wikimedia-clipart.png";
            ranking = Ratings[1].Value;
        }

        return (
            <div className={this.props.view === "grid" ? "movie_card2" : "movie_card"} id={color}>
                <div className={this.props.view !== "grid" ? "info_section" : "info_section info_section2"}>
                    <div className={this.props.view !== "grid" ? "movie_header" : "movie_header movie_header2"}>
                        {
                            Poster && Poster !== 'N/A' ? <img className="poster" src={Poster} alt="Poster NA" /> : ""
                        }
                        <h2>{Title}</h2>
                        <h4>{Type === "series" ? Year : Released}{Director === 'N/A' ? "" : ", " + Director}</h4>
                        <h4>{totalSeasons ? "Seasons: " + totalSeasons : ""}</h4>
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
                            {imdbID ? <li><a href={"https://www.imdb.com/title/" + imdbID + "/"}><img width="70px" height="40px" src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png" alt="" /></a></li> : ""}
                            {imdbID ? <li><a href={"https://trakt.tv/search/imdb/" + imdbID + "/"}><img width="40px" height="40px" src="https://walter.trakt.tv/hotlink-ok/public/favicon.png" alt="" /></a></li> : ""}
                            {Date.now() > Date.parse(Released) ?
                                <>
                                    {
                                        !streamingInfo && this.state.working === 'yes' && (Type === "movie" || Type === "series")
                                            ? <li><div height="40px" className="square_btn stream button" value={imdbID} onClick={this.checkAvailability}>
                                                Check
                                                <br />
                                                streaming
                                            </div></li>
                                            : ""
                                    }
                                    {
                                        netflix.length > 0
                                            ? <li><a href={netflix}><img width="40px" height="40px" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" alt="" /></a></li>
                                            : ""
                                    }
                                    {
                                        prime.length > 0
                                            ? <li><a href={prime}><img width="40px" height="40px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodownload.org%2Fwp-content%2Fuploads%2F2018%2F07%2Fprime-video-logo-1.png&f=1&nofb=1" alt="" /></a></li>
                                            : ""
                                    }
                                    {
                                        disney.length > 0
                                            ? <li><a href={disney}><img width="40px" height="40px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0cd82ff4-fa94-4020-9a16-f41089efc593/dd5d95n-46013979-82a8-4fae-ac31-fd4865a8d99d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMGNkODJmZjQtZmE5NC00MDIwLTlhMTYtZjQxMDg5ZWZjNTkzXC9kZDVkOTVuLTQ2MDEzOTc5LTgyYTgtNGZhZS1hYzMxLWZkNDg2NWE4ZDk5ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mL37S_siI4svhpddNLPe-E__VgYmMDwTea5XNYBGp0k" alt="" /></a></li>
                                            : ""
                                    }
                                    {
                                        apple.length > 0
                                            ? <li><a href={apple}><img width="40px" height="40px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsupport.apple.com%2Fcontent%2Fdam%2Fedam%2Fapplecare%2Fimages%2Fen_US%2Fappletv%2Ffeatured-content-apple-tv-icon_2x.png&f=1&nofb=1" alt="" /></a></li>
                                            : ""
                                    }
                                    {
                                        this.state.working === 'no'
                                            ? <li className="availability">Option not available.<br></br> Try again tomorrow</li>
                                            : ""
                                    }
                                </>
                                : ""}
                        </ul>
                    </div>

                </div>
                {
                    Poster ?
                        <div className="blur_back" style={{
                            backgroundImage: `url(` + Poster + `)`
                        }}>
                        </div>
                        : ""
                }
            </div>
        );
    }
}
export default MovieCard;