import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [], // Track products in the cart
  availableQuantities: {}, // Track available quantities
  totalPrice: [], // [{id, realQuantity, price}, {id, realQuantity, price}, {id, realQuantity, price}]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price, quantity, realQuantity } = action.payload;

      state.availableQuantities[id] -= 1;
      
      const existingProduct = state.products.find((product) => product.id === id);
      const existingTotalPrice = state.totalPrice.find((ele) => ele.id === id)
      
      if (existingProduct) {
        existingProduct.realQuantity = realQuantity;
        // localStorage.setItem('products', JSON.stringify(state.products))

        if(existingTotalPrice){
          existingTotalPrice.realQuantity = realQuantity
        }

      } else {
        state.products.push({...action.payload, realQuantity });
        state.totalPrice.push({id, realQuantity, price });
        // localStorage.setItem('products', JSON.stringify(state.products))
      }
    },
    removeFromCart: (state, action) => {
      const { id, quantity } = action.payload;


      let realQuantity = quantity - state.availableQuantities[id]
      
      // remove the product from cart
      state.products = state.products.filter((product) => product.id !== id);
      // remove the price with its quantity from cart
      state.totalPrice = state.totalPrice.filter((price) => price.id !== id);

      state.availableQuantities[id] += realQuantity;

      // localStorage.removeItem('products')
    },
    setAvailableQuantities: (state, action) => {
      state.availableQuantities = { ...state.availableQuantities, ...action.payload };
    },
    increceQuantitiesByOne: (state, action) => {
      const {id, quantity} = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);
      const existingTotalPrice = state.totalPrice.find((price) => price.id === id);

      // control the products
      existingProduct.realQuantity += 1
      state.availableQuantities[id] -= 1

      // contrl the totalPrice by increce quantity
      existingTotalPrice.realQuantity += 1
    },
    decreceQuantitiesByOne: (state, action) => {
      const {id, quantity} = action.payload
      const existingProduct = state.products.find((product) => product.id === id);
      const existingTotalPrice = state.totalPrice.find((price) => price.id === id);

      if(existingProduct.realQuantity - 1 === 0){
        // control the products
        state.availableQuantities[id] += 1
        state.products = state.products.filter((product) => product.id !== id);
        state.totalPrice = state.totalPrice.filter((price) => price.id !== id)
        // contrl the totalPrice by decrece quantity

      } else {
        // control the products
        existingProduct.realQuantity -= 1
        state.availableQuantities[id] += 1

        // contrl the totalPrice by decrece quantity
        existingTotalPrice.realQuantity -= 1
      }
    }
  },
})

export const { addToCart, removeFromCart, setAvailableQuantities, increceQuantitiesByOne, decreceQuantitiesByOne } = cartSlice.actions;

export default cartSlice.reducer;
