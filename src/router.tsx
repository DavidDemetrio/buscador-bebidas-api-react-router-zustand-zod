import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import IndexPage from './views/IndexPage'
import GenerateAI from './views/GenerateAI'

const Favorites = lazy(() => import('./views/FavoritesPage'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<IndexPage />} index />
                    <Route
                        path='/favoritos'
                        element={
                            <Suspense fallback="Cargando ...">
                                <Favorites />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/ai'
                        element={
                            <Suspense fallback="Cargando ...">
                                <GenerateAI />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter