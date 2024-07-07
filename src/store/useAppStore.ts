import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoriteSlice } from "./favoritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

// Slice pattern
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...arg) => ({
    ...createRecipesSlice(...arg),
    ...createFavoriteSlice(...arg),
    ...createNotificationSlice(...arg)
})))
