import React, { Component } from 'react'

export class Newsitem extends Component {
      
  render() {
    let {title,description,imageUrl,newUrl,author,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">By {author} on {new Date(date).toGMTString()}</p>
                <a rel="noreferrer" href={newUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
