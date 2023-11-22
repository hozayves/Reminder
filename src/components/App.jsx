
import React from "react";
import {About} from '../components/About'
import Reminders from '../components/Reminders'
import { createBrowserRouter, NavLink, Outlet, useLinkClickHandler, useLocation    } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                path: "/:listId?",
                element: <Reminders />
            },
            {
                path: "/about",
                element: <About />
            },
        ]
    }
])
function App() {
    const location = useLocation();

    return (
        <div className="pt-12">
            <header className="max-w-md mx-auto">
                <nav className="mt-4 space-x-4">
                    <NavLink
                        to={`/${location.search}`}
                        className={({isPending, isActive}) => {
                            return isActive 
                                    ? "active text-gray-900 border-b-2 border-gray-600 font-semibold text-sm" 
                                    : isPending 
                                    ? "pending" 
                                    : "pb-px font-semibold text-sm text-gray-500 hover:text-gray-900"
                        }}
                    >Reminders</NavLink>
                    <NavLink
                        to={`/about${location.search}`}
                        className={({isPending, isActive}) => {
                            return isActive 
                                    ? "active text-gray-900 border-b-2 border-gray-600 font-semibold text-sm" 
                                    : isPending 
                                    ? "pending" 
                                    : "pb-px font-semibold text-sm text-gray-500 hover:text-gray-900"
                        }}
                    >About</NavLink>
                </nav>
            </header>
            <main className="mt-10">
                <Outlet />
            </main>
        </div>
    )
}