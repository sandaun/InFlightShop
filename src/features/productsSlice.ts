import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fakeProductsApi} from '../api/fakeProductsApi';
import {ProductsState} from '../types/productTypes';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await fakeProductsApi();
    return data.products;
  },
);

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementQuantity(state, action: PayloadAction<string>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 0) + 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else if (product) {
        // Remove the product if quantity goes to 0
        state.items = state.items.filter(p => p.id !== action.payload);
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export const {incrementQuantity, decrementQuantity, removeProduct} =
  productsSlice.actions;
export default productsSlice.reducer;
