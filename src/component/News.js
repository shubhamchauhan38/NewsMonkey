import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    pageSize: 8,
    category : 'general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      artice: [],
      loading: false,
      page:1,
      totalArticles:0
    };
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&&category=${this.props.category}&&apiKey=94cf5130dcc7438aa389fc0c5cb8fb11&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData  = await data.json();
    console.log(parsedData);
    this.setState({artice:parsedData.articles,
      totalArticles:parsedData.totalResults,
      loading:false})

  }
  handlePrevClick = async() => {
    console.log("Prev")
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&&category=${this.props.category}&&apiKey=94cf5130dcc7438aa389fc0c5cb8fb11&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData  = await data.json();

    this.setState({
      page : this.state.page - 1,
      artice:parsedData.articles,
      loading:false
    })
  }

  handleNextClick = async () => {
    console.log("Next")
    if(!(this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&&category=${this.props.category}&&apiKey=94cf5130dcc7438aa389fc0c5cb8fb11&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData  = await data.json();
    this.setState({
      page : this.state.page + 1,
      artice:parsedData.articles,
      loading:false

    })
  }
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-3">NewsMonkey - Top Headline</h1>
      {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.artice.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem 
                title={!element.title?"":element.title.slice(0,45)} description={!element.description?"":element.description.slice(0,88)} imageUrl={!element.urlToImage?"https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1482460958-20241113132740958.jpg?c=16x9&q=w_800,c_fill":element.urlToImage} newUrl = {element.url}/>
            </div>;
          })}
        </div>
        <div className="d-flex justify-content-between my-2">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    );
  }
}

export default News;
