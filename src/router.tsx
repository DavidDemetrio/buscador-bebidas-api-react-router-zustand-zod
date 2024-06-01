import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import IndexPage from './views/IndexPage'
import Favorites from './views/Favorites'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<IndexPage />} />
                    <Route path='/favoritos' element={<Favorites />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter