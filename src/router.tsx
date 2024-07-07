import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import IndexPage from './views/IndexPage'

const Favorites = lazy(() => import('./views/FavoritesPage'))

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<IndexPage />} index />
                    <Route path='/favoritos' element={
                        <Suspense fallback="Cargando ...">
                            <Favorites />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter