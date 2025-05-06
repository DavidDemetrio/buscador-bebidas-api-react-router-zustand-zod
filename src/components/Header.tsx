import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

const Header = () => {
    const { pathname } = useLocation()
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const isHome = useMemo(() => pathname === '/', [pathname])
    const fetchCategories = useAppStore(state => state.fetchCategories)
    const { drinks } = useAppStore(state => state.categories)
    const searchRecipes = useAppStore(state => state.searchRecipes)
    const showNotification = useAppStore(state => state.showNotification)
    useEffect(() => { fetchCategories() }, [])

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // TODO: Validar
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                error: true,
                text: 'Todos los campos son obligatorios'
            })
            return
        }
        // Consultar las recetas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >Favoritos</NavLink>
                        <NavLink
                            to="/ai"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >Generar con IA</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400
                        my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase
                                font-extrabold text-lg"
                            >Ingredientes</label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Escribe una bebida para obtener
                                los ingredientes ..."
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase
                                font-extrabold text-lg"
                            >Categoría</label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {drinks.map(drink => (
                                    <option
                                        key={drink.strCategory}
                                        value={drink.strCategory}
                                    >{drink.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Buscar recetas"
                            className="cursor-pointer bg-orange-800
                            hover:bg-orange-900 text-white font-extrabold
                            w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}

export default Header