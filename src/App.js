import React, { Component } from 'react'
// react-dom ติดตั้ง เพื่อใช้ Router , Route , Switch  ในการลิ้งค์
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './page/Home';
import Edit from './page/EditProduct';
import Add from './page/AddProduct';
import Menu from './components/Menu';
const App = () => {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} /> 
        {/* ลิ้งค์ไปหน้า Home */}
        <Route path="/home" component={Home} />
        {/* ลิ้งค์ไปหน้า Home */}
        <Route path="/edit/:id" component={Edit} />
        {/* ลิ้งค์ไปหน้า edit ด้วย ID */}
        <Route path="/add" component={Add} />
        {/* ลิ้งค์ไปหน้า add */}
      </Switch>
    </Router>
  )
}

export default App
