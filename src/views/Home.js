import React, { Component } from 'react'
import { Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Header from './components/Header';
// const { Meta } = Card;

import style from '../assets/app.scss';
import '../assets/common.scss';

export default class Home extends Component {

  handleClick = (event) => {
    console.log('click.');
  }

  render() {
    return (
      <div>
        <Header />
        
      </div>
    )
  }
}
