//used by the ProductList component
;//We want to be able to select a category from the previous two actions we created  at update categories
//and display products for that category from the update prodcuts action
/* The end goal for update_products is to store the data retreived for products by Apollo in this global state*/
/*Update_current_category is the connector btwn the other 2. We will select a category from the state created by update_categories anddisplay products for that
category from the list we create from the update_products action */
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';
