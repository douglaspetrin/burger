import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //         this.state = {
    //     };
    // }
    
    state = {
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount() {
        console.log(this.props);
        // axios.get('https://doug-burger.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //         console.log(this.state.ingredients)
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     })
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients) //first create strigns and than map to get the values of each one
            .map(igKey => {
                return ingredients[igKey]; //it is returning each ingrediente, ex: salad, bacon, cheese, meat.
                // and now we have an array with the values.  
            }) // reduce() to return a single number. the sum of all ingredientes.
            .reduce((sum, el) => {
                return sum + el;
            }, 0); 
           return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});  
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

      let orderSummary =  null; 
      
      let burger = this.state.error ? <p>Ingredients can't be loaded. </p> : <Spinner />;
        
      if(this.props.ings) {
        burger = (
            <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    />
            </React.Fragment>
        );

    orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price}
                    />;

      }

      if(this.state.loading) {
        orderSummary = <Spinner />;
  }
      

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));