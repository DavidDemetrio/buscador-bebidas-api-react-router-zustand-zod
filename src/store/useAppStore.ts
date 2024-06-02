import { create } from "zustand";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";

export const useAppStore = create<RecipesSliceType>((...arg) => ({
    ...createRecipesSlice(...arg)
}))