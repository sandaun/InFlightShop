import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
    incrementQuantity(state, action) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 0) + 1;
      }
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

export const {incrementQuantity} = productsSlice.actions;
export default productsSlice.reducer;
