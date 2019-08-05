import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component{   
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        this.setState({loading:true});
        const orders={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            customer:{
                name:'Max',
                address:{
                    street:'Test Street',
                    zipCode:'dsadas',
                    country:'India'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',orders).then(response=>{
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(error=>{
            this.setState({loading:false});
        });
        event.preventDefault();
        
    }
    render(){

        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );

        if(this.state.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;