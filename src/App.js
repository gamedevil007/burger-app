import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
function App() {
  return (
            <Auxiliary>
                <div>
                    <Layout>
                      <BurgerBuilder/>
                    </Layout>
                </div>
            </Auxiliary>
        );
}

export default App;