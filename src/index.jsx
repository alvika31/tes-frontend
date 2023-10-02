import React from "react";
import {createRoot} from 'react-dom/client'
import ProductApp from "./views/ProductApp";
import './index.css'


const root = createRoot(document.getElementById('root'))
root.render(<ProductApp />)