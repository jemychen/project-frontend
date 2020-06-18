import React from 'react';
import ItemContainer from './ItemContainer';
import NavBar from './NavBar'
// import ItemSideBar from './ItemSideBar'
import {Switch, Route} from 'react-router-dom'
import Form from './Form'

import OrderContainer from './OrderContainer'
// import ItemCo from './ItemCo'
import {withRouter, Redirect} from 'react-router-dom'
import PlaceAnOrder from './PlaceAnOrder'


import './App.css';


class App extends React.Component {

  state = {
     user: {
      id: 0,
      username: "",
      orders: []
    },
    token: "",
    items:[]
  }



  componentDidMount(){

    if (localStorage.token) {

      fetch("http://localhost:3000/persist", {
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(res => {
        this.setState({
          user: res.user
        })
      })
    }

    fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          items: data
        })
      })
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(res => {
        if(res.message){
          alert("wrong username or password")
        }else{
          localStorage.setItem("token",res.token)

          this.setState({
            user: res.user,
            token: res.token
          }, () => {
            this.props.history.push("/")
          })
        }
      })
  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(res => {
        if(res.message){
          alert("Invalid username or password")
        }else{
          localStorage.setItem("token",res.token)

          this.setState({
            user: res.user,
            token: res.token
          }, () => {
            this.props.history.push("/")
          })
        }
      })
  }

  logSomeonOut = () => {
    console.log("add hit log out")
    localStorage.clear()
    this.props.history.push("/")
  }


  addToCart = (newOrder) => {
    let newCopy = [...this.state.user.orders, newOrder]
    this.setState({
      user:{
        ...this.state.user, orders: newCopy
      }
    })
  }
  
  deleteItem = () => {

  }


  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/sign") {
      return <Form formName="Sign Up" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

    playstation = () => {
      let playstation = this.state.items.filter(item => {
        return item.category === 'playstation'
      })
      return playstation
    } 
    
    nintendo = () => {
      let nintendo = this.state.items.filter(item => {
        return item.category === 'nintendo'
      })
      return nintendo
    } 

    microsoft = () => {
      let microsoft = this.state.items.filter(item => {
        return item.category === 'microsoft'
      })
      return microsoft
    } 

    itemCategory = (routerProps) =>{
      if (routerProps.location.pathname === "/playstation"){
        return <ItemContainer
          user={this.state.user}
          items={this.playstation()}
      />
      } else if (routerProps.location.pathname === "/microsoft") {
          return <ItemContainer
          user={this.state.user}
          items={this.microsoft()}    
      />
      } else if (routerProps.location.pathname === "/nintendo") {
        return <ItemContainer
        user={this.state.user}
        items={this.nintendo()}
        />
      }
    }


    renderItemContainer = () => {
      return <ItemContainer
      items={this.state.items}
      user={this.state.user}
      token={this.state.token}
      sign={this.state.user.username ? true : false}
      addToCart={this.addToCart}
     />
    }
    renderOrderContainer = () => {
      return <OrderContainer
      orders={this.state.user.orders}
      />
    }

    placeOrder = () => {
      return <PlaceAnOrder
        username={this.state.user}
      />
    }

  render() {
    console.log(this.state.items)
    return (
      <div>
        <NavBar
        user={this.state.user}
        />
        <Switch>
        {/* <Route path="/placeOrder"component={PlaceAnOrder} /> */}
        <Route path="/placeOrder"component={this.placeOrder} />
        <Route path="/login" render={this.renderForm} />
        <Route path="/sign" render={this.renderForm} />
        <Route path="/logout" render={this.logSomeonOut} />
        <Route path="/playstation" render={ this.itemCategory } />
        <Route path="/microsoft" render={ this.itemCategory } />
        <Route path='/nintendo' render={ this.itemCategory} />
        <Route path="/cart" component={this.renderOrderContainer} />
        <Route path="/" component={this.renderItemContainer} />
  
        </Switch>
      </div>
      );
    }
  }
  
export default withRouter(App);
