import React, { Component } from 'react'; 
import Button from '../../../components/UI/Button/Button'; 
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: ''
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Coutry'
                },
                value: ''
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your e-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},

                    ]
                },
                value: ''
            },
        },

        loading: false
    };

    
// using preventDefault() to avoid to send a request as it is set by default
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

         this.setState({loading: true})
         const order = {
      
             ingredients: this.props.ingredients,
             price: this.props.price,
    }

         axios.post('/orders.json', order)
             .then(response => {
          
                 this.setState({loading: false});
                 console.log(response)
                 this.props.history.push('/');
             } )
             .catch(error => {
                 this.setState({loading: false});
                 //console.log(error)
             } );    


    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm //cloning the orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] //cloning deeply what is inside "elementType"
        };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
            
            {formElementsArray.map(formElement => (
                <Input
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );

        if(this.state.loading){
            form = <Spinner />;
        } 

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                {form}
            </div>
        );
    }

};

export default ContactData ;