import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
function App() {
  return (
            <Auxiliary>
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/" exact component={BurgerBuilder}/>
                            <Route path="/orders" component={Orders}/>
                            <Route path="/checkout" component={Checkout}/>
                        </Switch>
                    </Layout>
                </div>
            </Auxiliary>
        );
}

export default App;