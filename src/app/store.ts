import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
// import paymentReducer from '../features/payment/paymentSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    // payment: paymentReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
