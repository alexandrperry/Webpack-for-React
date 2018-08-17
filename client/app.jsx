import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactSVG from 'react-svg';
import GoalMap from './GoalMap.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import toastr from 'toastr';
import jquery from 'jquery';

import Tree from './Tree.jsx';
import Share from './Share.jsx';
import AboutUs from './AboutUs.jsx';
import ContactUs from './ContactUs.jsx';
import Terms from './Terms.jsx';
import Footer from './Footer.jsx';
import Aside from './Aside.jsx';

import Registration from './Registration.jsx';
import Profile from './Profile.jsx';
import Decision from './Decision.jsx';


class Routing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maps: [],
      isAuthShown: false,
      isRegistration: false,
      isLoggedIn: false,
    };
  }

  componentWillMount() {
    fetch('/api/user/maps/admin').then((data) => data.json()).then((maps) => {
      this.setState({
        maps
      })
    });

    const self = this
    function checkAuth() {
      fetch('/api/islogged', {
        method: 'GET',
        credentials: 'include'
      })
        .then(res => {
          console.log(res, 'res');
          return res.json()
        })
        .then(res => {
          console.log(`Am I logged in ? ${res.isAuth}`)
          self.setState({isLoggedIn: res.isAuth})
        });
    }

    checkAuth()
  }

  componentDidMount() {

    const footer = document.querySelector('footer');
    const nav = document.querySelector('nav');
    const aside = document.querySelector('aside.overlayed');
    const windowHeight = window.innerHeight;
    const liDiv = document.querySelectorAll('.li-div');
    document.addEventListener('scroll', onScroll);


    onScroll();
    setTimeout(function() {
      onScroll();
      // var body = document.body,
      //     html = document.documentElement;
      //
      // var height = Math.max( body.scrollHeight, body.offsetHeight,
      //                  html.clientHeight, html.scrollHeight, html.offsetHeight );
      //
      // console.log(height, '********)')
      //
      //
      // console.log('height');
      //
      // aside.style.height = height + 'px';
      //
      // console.log(aside);
    }, 10);

    function onScroll() {
      const aside = document.querySelector('aside.overlayed');
      const navHeight = nav.offsetHeight;
      const footerPosition = footer.getBoundingClientRect().top;
      const footerHeight = footer.offsetHeight;


     if (footerPosition > 0 && footerPosition < windowHeight) {
        console.log('I SEE FOOTER')
        setFooterOverlay(nav);
      } else {
        setDefaultOverlay(nav);
      }

      function setFooterOverlay(element) {
        if (aside) {
          aside.style.paddingBottom = `${footerPosition + 20}px`;
          aside.style.paddingTop = '20px';
        }
        element.style.position = 'fixed';
        element.style.bottom= `${windowHeight - footerPosition}px`;
        element.style.top = 'auto';
      }


      function setDefaultOverlay(element) {
        if (aside) {
          aside.style.paddingBottom = '20px';
          aside.style.paddingTop = '20px';
        }
        element.style.position = 'fixed';
        element.style.top = '0';
        element.style.bottom = '0';
      }




    }
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>


          <Registration
            isShown={this.state.isAuthShown}
            appState={this}></Registration>
          <div className="main">
            <nav class="main-menu">
              <ul>
                  <li>
                    <Link to={'/'}>
                    <ReactSVG path="/img/home.svg"/>
                      <span class="nav-text">
                          Home
                        </span></Link>
                  </li>
                  <li class="has-subnav">
                      <a>
                         <ReactSVG path="/img/decision.svg"/>
                          <span class="nav-text">
                              Make Decision
                          </span>
                      </a>
                        <div className="li-div">
                          {this.state.maps.map((el, id) => {
                            return <Link to={`/maps/${el.id}`} key={id}>{el.title}</Link>
                          })}
                        </div>
                  </li>
				  <li>
                      <a href="/goal-map">
                          <ReactSVG path="/img/levels-controls.svg"/>
                          <span class="nav-text">
                              Set Goal
                          </span>
                      </a>
                   </li>
				   <li>
                          <Link to={'/vis'}>
                          <ReactSVG path="/img/levels-controls.svg"/>
                          <span class="nav-text">
                              Pick Book|Movie
                          </span>
                          </Link>
                   </li> 

                  {this.state.isLoggedIn ? (
                    <li class="has-subnav">
                        <a href="/me/profile/#maps">
                            <ReactSVG path="/img/avatar.svg"/>
                            <span class="nav-text">
                                Profile
                            </span>
                        </a>
                    </li>
                  )
                  :
                  ' '}

                  <li>
                     {this.state.isLoggedIn ? (<a href="#" onClick={() => {
                         fetch('/api/logout', {
                           method: 'GET',
                           credentials: "include"
                         })
                         .then(res => this.setState({isLoggedIn: false}))
                     }}>
                          <ReactSVG path="/img/logout.svg"/>
                          <span class="nav-text">
                              Logout
                          </span>
                      </a>)
                    :
                    (<li class="has-subnav">
                        <a href="#" onClick={() => {
                            console.log('this state', this.state.isAuthShown);
                            this.setState({ isAuthShown: !this.state.isAuthShown });
                        }}>
                            <ReactSVG path="/img/login.svg"/>
                            <span class="nav-text">
                                Log In
                            </span>
                        </a>
                    </li>)}
                  </li>
              </ul>
            </nav>

            <main>
              <Switch>
                <Route exact path="/" component={({ match }) => {
                  var map = {
                    title: 'Type your decision',
                    cases: ['Decision Option 1', 'Decision Option 2'],
                    owner: 'admin',
                    options: [
                      'Decision Factor 1',
                      'Decision Factor 2',
                      'Decision Factor 3',
                      'Decision Factor 4',
                      'Decision Factor 5',
                      'Decision Factor 6',
                      'Decision Factor 7',
                      'Decision Factor 8',
                    ]
                  };
                  return <Decision isLoggedIn={this.state.isLoggedIn} match={match} key={Math.random()} map={map}></Decision>
                }} />
                <Route path="/maps/:id" component={({ match }) => {
                  const self = this;
                  const { id } = match.params;
                  const item = this.state.maps.filter((el) => el.id === id)[0];
                  return <Decision isLoggedIn={this.state.isLoggedIn} match={match} key={Math.random()} map={item} id={id}></Decision>
                }}/>
                <Route path="/contact-us" component={ContactUs}/>
                <Route path="/about" component={AboutUs}/>
                <Route path="/terms-of-service" component={Terms}/>
                <Route path="/share/:id" component={Share}/>
                <Route path="/vis" component={Tree}/>
                <Route path="/me/profile" component={Profile}/>
                <Route path="/goal-map" component={GoalMap}/>
                <Route component={NoFound}/>
              </Switch>
              <aside className="clear-aside">

              </aside>
            </main>



          </div>

          <Footer></Footer>
          </MuiThemeProvider>
      </Router>
    )
  }

}




const NoFound = ({ match }) => (
  <div>
    <h3>Error 404 page not found</h3>
  </div>
)


ReactDOM.render(<Routing />, document.getElementById('app'));
