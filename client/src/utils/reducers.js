/* A reducer is a function that updates state by returning a new state object and never alters the original state object.*/
/*The newstate object will be the result of the reducer function, which accepts the following 2 parameters: type and value. Type-this is the type of action we're performing
and should be one of the predefined actions we created earlier. Value -a name representative of the new data we want to use with the action.*/
/*useReducer() hook is meant to manage a greater level of state than useState()*/
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions"
import { useReducer } from 'react'

export const reducer = (state, action) => {
    switch (action.type) {
        //if action type value is the value of 'UPDATE_PRODUCTS', return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            };
            //.filter only keeps the items that dont match the provided _id property
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product
                })
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
            //if it's none of these actions, do not update state and keep things the same
            default:
                return state;
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}