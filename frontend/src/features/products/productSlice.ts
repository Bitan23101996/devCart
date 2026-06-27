import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getProductById, getProducts } from './services/product.service';
import { ProductState } from '@/types/product.types';
import { RootState } from '@/store/store';

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    selectedCategory: 'home',
    searchText: ''
};

//Get All Product
export const fetchProducts = createAsyncThunk(
    "product/list",
    async () => {
        return await getProducts();
    }
)

//Get Product by ID
export const fetchProductById = createAsyncThunk(
    "product/details",
    async (id: number) => {
        return await getProductById(id);
    }
)


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCategory(state, action) {
            state.selectedCategory = action.payload;
        },

        setSearchText(state, action) {
            state.searchText = action.payload;
        },

        resetProductState: () => initialState,

        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            //All Products
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch the products';
            })

            //Selected Product
            .addCase(fetchProductById.pending, state => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload.data;
            })

            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch the product by Id';
            })



    },
});

export const selectFilteredProducts = createSelector(
    [
        (state: RootState) => state.products.products,
        (state: RootState) => state.products.selectedCategory,
        (state: RootState) => state.products.searchText,
    ],
    (products, selectedCategory, searchText) => {

        let filteredProducts = products;

        // category filter
        if (selectedCategory !== 'home') {
            filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // search filter (name + description)
        if (searchText.trim()) {
            const query = searchText.toLowerCase();

            filteredProducts = filteredProducts.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        return filteredProducts;
    }
);

export default productSlice.reducer;
export const { setCategory, setSearchText, resetProductState, clearError } = productSlice.actions;

