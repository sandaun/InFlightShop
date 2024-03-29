export interface Product {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedCurrency: string;
}

export interface ApiResponse {
  products: Product[];
}
