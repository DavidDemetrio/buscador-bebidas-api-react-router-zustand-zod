import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe:Recipe) => void
    favoriteExist: (id:Recipe['idDrink']) => boolean
    loadFromStorage(): void
}

export const createFavoriteSlice:StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: recipe =>{
        if (get().favoriteExist(recipe.idDrink)) {
            console.log('Si existe')
            // Eliminar de favoritos
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })

            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: true
            })
        } else {
            console.log("No existe")
            // Una forma más orientada a programacion OPO
            set({
                favorites: [...get().favorites, recipe]
            })
            // Usando un callback
            // set(state => ({
            //     favorites: [...state.favorites, recipe]
            // }))

            // Ambas estructuras son válidas

            createNotificationSlice(set,get,api).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })
        }

        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem("favorites", JSON.stringify(get().favorites))
    },
    favoriteExist: id => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem("favorites")
        if (storeFavorites) {
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    }
})

// Slice pattern