import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.6,
    bacon: 0.7
}


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //         this.state = {
    //     };
    // }
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount() {
        console.log(this.props);
        axios.get('https://doug-burger.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                console.log(this.state.ingredients)
            })
            .catch(error => {
                this.setState({error: true});
            })
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
            this.setState({purchasable: sum > 0});
    }


    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        
        if (oldCount <= 0){
            return; //nothing happens
        }
        
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction; //it was fixed.

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});  
    };

    purchaseContinueHandler = () => {
        //alert('you go ahead!');
    //     this.setState({loading: true})
    //     const order = {
            
    //         ingredients: this.state.ingredients,
    //         totalPrice: this.state.totalPrice,

    //         customer: {
    //             name: 'Carol',
    //             address: 'main st 231',
    //             city: 'london',
                

    //         }
    // }
        

    //     axios.post('/teste.json', order)
    //         .then(response => {
                
    //             this.setState({loading: false, purchasing: false});
    //             console.log(response)
    //         } )
    //         .catch(error => {
    //             this.setState({loading: false, purchasing: false});
    //             //console.log(error)
    //         } )    
    const queryParams = [];
    for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
    //    ingredients: this.state.ingredients
    });   
    
//     {this.props.history.push({
//         pathname: '/checkout',
//         search: '?query=order',
//         state: { 
//               data: this.state.ingredients,
//               price: this.state.totalPrice.
//         }
// })}


    };

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

      let orderSummary =  null; 
      
      let burger = this.state.error ? <p>Ingredients can't be loaded. </p> : <Spinner />;
        
      if(this.state.ingredients) {
        burger = (
            <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    />
            </React.Fragment>
        );

    orderSummary = <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);