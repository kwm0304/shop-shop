/* useContext will be used to instantiate a new Context object. We're using this to create the container to hold our global state data and 
functionality so we can provide it throughout our app. useContext is another hook that will let us use the state created from the createContext function*/
import React, {createContext, useContext} from 'react';
import { useProductReducer } from './reducers';
/* Every Context object created from createContext() comes with 2 components (Provider and Consumer)\
Provider is a type of react component that we wrap our app in so it can make state data that's passed into it as a prop, available to all other components
Consumer is our means of grabbing and using the data that Provider holds for us*/
const StoreContext = createContext();
const { Provider } = StoreContext;
/*instantiate our global state with useProductReducer() we created earlier. B/c it wraps around the useReducer() hook, we receive the following 
2 items as a return. 1 State - is the most up to date version of our global state object 2 Dispatch - is the method we execute to update our state
It is specifically going to look for an action object passed in as it's argument.*/
const StoreProvider = ({ value = [], ...props}) => {
    /*After useProductReducer() completes and provides us w/ new state and function to update state, -> return the StoreContext's Provider component
    w/ our state object and dispatch the function provided as data for the value prop.
    Long story short we are turning StoreProvider into a custom <Provider> component */
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });
    //use this to confirm it works
    console.log(state);
    return <Provider value={[state,dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext)
};

export { StoreProvider, useStoreContext };