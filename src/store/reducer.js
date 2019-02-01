import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4
};

const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {
            case actionTypes.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: state.ingredients + action.type
                    }
            
                    
            case actionTypes.REMOVE_INGREDIENT:
            
            const updatedArray = state.ingredients.filter(ingredient => ingredient.id !== ingredientId);
            
                return {
                    ...state,
                    ingredients: updatedArray
                    }
            default:
    }

    return state;

};

export default reducer;