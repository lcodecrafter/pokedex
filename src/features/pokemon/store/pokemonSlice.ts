import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  currentPage: number;
}

const initialState: PokemonState = {
  currentPage: 1,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
