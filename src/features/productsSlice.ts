import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fakeProductsApi} from '../api/fakeProductsApi';
import {ProductsState} from '../types/productTypes';
import {Currency} from '../types/utilsTypes';

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
  selectedCurrency: Currency.EUR,
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
      if (product) {
        product.quantity =
          product.quantity && product.quantity > 1 ? product.quantity - 1 : 0;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.quantity = 0;
      }
    },
    setSelectedCurrency(state, action: PayloadAction<string>) {
      state.selectedCurrency = action.payload;
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

export const {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  setSelectedCurrency,
} = productsSlice.actions;
export default productsSlice.reducer;
