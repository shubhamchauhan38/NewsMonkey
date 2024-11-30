import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Corrected typo from 'artice' to 'articles'
      loading: false,
      page: 1,
      totalArticles: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async UpdateNews(page) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=94cf5130dcc7438aa389fc0c5cb8fb11&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, // Corrected typo from 'artice' to 'articles'
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.UpdateNews();
  }

  handlePrevClick = async () => {
    console.log("Prev");
    this.setState({
      page: this.state.page - 1,
    });
    this.UpdateNews();
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1; // Increment page
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=94cf5130dcc7438aa389fc0c5cb8fb11&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
  
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), // Append new articles
      totalArticles: parsedData.totalResults,
      page: nextPage, // Update page after fetching
      loading : false
    });
  };
  

  handleNextClick = async () => {
    console.log("Next");
    this.setState({
      page: this.state.page + 1,
    });
    this.UpdateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-3">NewsMonkey - Top Headline</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length} // Corrected typo from 'artice' to 'articles'
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles} // Corrected typo
          loader={<Spinner />}
        >
        <div className="container">
        
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={!element.title ? "" : element.title.slice(0, 45)}
                    description={!element.description ? "" : element.description.slice(0, 88)}
                    imageUrl={
                      !element.urlToImage
                        ? "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1482460958-20241113132740958.jpg?c=16x9&q=w_800,c_fill"
                        : element.urlToImage
                    }
                    newUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        
      </div>
    );
  }
}

export default News;
