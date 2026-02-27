import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { Home } from './pages/home'
import { Contato } from './pages/contato'
import { Tarefas } from './pages/tarefas'
import { Gastos } from './pages/gastos'
import { Menu } from './components/menu'
import { useEffect, useState } from 'react'
export function App() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/contato' element={<Contato />} />
                <Route path='/gastos' element={<Gastos />} />
                <Route path='/tarefas' element={<Tarefas />} />
            </Routes>
        </BrowserRouter>
    )
}