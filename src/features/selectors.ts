import {RootState} from '../app/store';

export const selectProducts = (state: RootState) => state.products.items;
export const selectCurrency = (state: RootState) =>
  state.products.selectedCurrency;
