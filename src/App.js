
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


export default class App extends Component {
    
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={5} category='sports'/>
      </div>
    )
  }
}
 