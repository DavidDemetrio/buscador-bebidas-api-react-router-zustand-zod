import { useAppStore } from "../store/useAppStore"
import type { Drink } from "../types"

type DrinkProps = {
    drink: Drink
}

const DrinkCard = ({ drink }: DrinkProps) => {
    const selectRecipe = useAppStore(state => state.selectRecipe)
    
    return (
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Imágen de ${drink.strDrink}`}
                    className="hover:scale-110 transition-transform hover:rotate-2"
                />
            </div>
            <div className="p-2">
                <h2
                    className="text-2xl truncate font-black"
                >{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold
                    text-white text-lg"
                    onClick={() => selectRecipe(drink.idDrink)}
                >Ver receta</button>
            </div>
        </div>
    )
}

export default DrinkCard