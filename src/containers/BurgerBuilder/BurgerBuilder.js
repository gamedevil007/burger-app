import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:0.3,
    bacon:0.7
}
class BurgerBuilder extends Component{

    state = {
       ingredients:null,
       totalPrice:4,
       purchasable:false,
       purchasing:false,
       loading:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-4d4cc.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        });
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);

        this.setState({purchasable:sum>0});
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;

        const updatedIngredients={
            ...this.state.ingredients
        };

        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;

        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0)
            return;
        const newCount=this.state.ingredients[type]-1;

        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=newCount;

        const priceSubtraction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceSubtraction;

        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseContinueHandler=()=>{
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        let burger=<Spinner/>

        if(this.state.ingredients){
            burger=(
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo} 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>
        );
        orderSummary=<OrderSummary
                    price={this.state.totalPrice} 
                    ingredients={this.state.ingredients}
                    purchaseContinued={this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}/>;
        }
        if(this.state.loading){
            orderSummary=<Spinner/>;
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);