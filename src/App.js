import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Auxiliary>
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/orders" component={Orders} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/auth" component={Auth} />
                            <Route path="/" exact component={BurgerBuilder} />
                        </Switch>
                    </Layout>
                </div>
            </Auxiliary>
        );
    }
}

const mapDispatchToProps = dispatch => {
        return {
            onTryAutoSignup: () => dispatch(actions.authCheckState())
        };

}

export default connect(null, mapDispatchToProps)(App);