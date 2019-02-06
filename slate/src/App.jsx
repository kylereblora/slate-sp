import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/client/Landing/Landing';
import Hire from './components/client/Hire/Hire';
import Home from './components/client/Home/Home';
import ProsDetails from './components/client/ProsDetails/ProsDetails';
import SignUp from './components/auth/SignUp/SignUp';
import SignIn from './components/auth/SignIn/SignIn';

class App extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact={true} path='/' component = {Landing} />
                        <Route exact={true} path='/register' component = {SignUp} />
                        <Route exact={true} path='/signin' component = {SignIn} />
                        <Route exact={true} path='/home' component = {Home} />
                        <Route exact={true} path='/hire' component = {Hire} />
                        <Route exact={true} path='/pro/:category/:id' component = {ProsDetails} />
                        
                    </Switch>
                </div>
            </Router>
                
        );
    }
}


export default App;