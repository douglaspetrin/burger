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
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Coutry'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
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

         this.setState({loading: true});

         const formData = {};

         for (let formElementIdentifier in this.state.orderForm) {
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; //added property like email, country...
         }
         const order = {
      
             ingredients: this.props.ingredients,
             price: this.props.price,
             orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            // rules.required means it is true
            isValid = value.trim() !== '' && isValid; //trim() removes empty spaces, comparing if is not equal to empty string ''
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid; // true or false
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
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
            <form onSubmit={this.orderHandler}>
            
            {formElementsArray.map(formElement => (
                <Input
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={formElement.config}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success">ORDER</Button>
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