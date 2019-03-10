import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/client/Landing/Landing';
import Hire from './components/client/Hire/Hire';
import Home from './components/client/Home/Home';
import ProsDetails from './components/client/ProsDetails/ProsDetails';
import SignUp from './components/auth/SignUp/SignUp';
import SignIn from './components/auth/SignIn/SignIn';
import ItemDetails from './components/client/ItemDetails/ItemDetails';
import Shop from './components/client/Shop/Shop';
import HomeAdmin from './components/admin/Home/Home';
import CreateItem from './components/admin/Items/CreateItem/CreateItem';
import Wishlist from './components/client/Wishlist/Wishlist';
import Profile from './components/account/Profile/Profile';

class App extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact={true} path='/landing' component = {Landing} /> 
                        <Route exact={true} path='/' component = {Landing} /> 
                        <Route exact={true} path='/register' component = {SignUp} />
                        <Route exact={true} path='/signin' component = {SignIn} />
                        <Route exact={true} path='/home' component = {Home} />

                        <Route exact={true} path='/hire' component = {Hire} />
                        <Route exact={true} path='/hire/:category' component = {Hire} />
                        <Route exact={true} path='/pro/:category/:id' component = {ProsDetails} />
                        
                        <Route exact={true} path='/wishlist/:id' component = {Wishlist} />
                        <Route exact={true} path='/profile/:id' component = {Profile} />
                        

                        <Route exact={true} path='/shop' component = {Shop} />
                        <Route exact={true} path='/item/:category/:id' component = {ItemDetails} />
                        
                        <Route exact={true} path='/home/admin' component = {HomeAdmin} />
                        <Route exact={true} path='/create_item' component = {CreateItem} />
                    </Switch>
                </div>
            </Router>
                
        );
    }
}


export default App;