import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART  } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  //data will hold the checkout session after getCheckout() runs
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [state, dispatch] = useStoreContext();
/* Checking to see if state.cart.length is 0, then executing getCart() to retrieve the items from the cart object store and save it to the
global state object. We use ADD_MULTIPLE_TO_CART b/c we have an array of items returning from IndexedDB, even if it's just one product saved*/
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] })
    };

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch])

  //once data variable has data, the stripePromise object will redirect to stripe
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });        
      })
    }
  }, [data])

  /* This will toggle cartOpen value whenever the [close] action is clicked, but nothing visual will happen yet. */
function toggleCart() {
  dispatch({ type: TOGGLE_CART })
}

function calculateTotal() {
  let sum = 0;
  state.cart.forEach(item => {
    sum += item.price * item.purchaseQuantity;
  });
//will loop over the items in the state.cart and add the product id's to the array
  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    })
    getCheckout({
      variables: { products: productIds }
    });
  }

  return sum.toFixed(2);
}

  if (!state.cartOpen) {
    return (
        <div className='cart-closed' onClick={toggleCart}>
            <span
                role="img"
                aria-label="trash">🛒</span>
        </div>
    )
}

  return (
    <div className="cart">
  <div className="close" onClick={toggleCart}>[close]</div>
  <h2>Shopping Cart</h2>
  {state.cart.length ? (
    <div>
      {state.cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
      <div className="flex-row space-between">
        <strong>Total: ${calculateTotal()}</strong>
        {
          Auth.loggedIn() ?
            <button onClick={submitCheckout}>
              Checkout
            </button>
            :
            <span>(log in to check out)</span>
        }
      </div>
    </div>
  ) : (
    <h3>
      <span role="img" aria-label="shocked">
        😱
      </span>
      You haven't added anything to your cart yet!
    </h3>
  )}
</div>
)};

export default Cart;