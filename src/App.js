import React, { Component } from 'react';
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={5} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={5} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={5} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={5} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={5} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
