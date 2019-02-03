import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/client/Landing/Landing';
import Navbar from './components/client/Navbar/Navbar';
import Hire from './components/client/Hire/Hire';
import Home from './components/client/Home/Home';
import Footer from './components/client/Footer/Footer';

class App extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact={true} path='/' component = {Landing} />
                        <Route exact={true} path='/home' component = {Home} />
                        <Route exact={true} path='/hire' component = {Hire} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
                
        );
    }
}


export default App;