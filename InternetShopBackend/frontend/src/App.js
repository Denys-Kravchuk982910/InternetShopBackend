import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import {routes} from "./routes/MainRoutes/mainRoutes.js"
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './redux/reducers/productReducer';
import axios from 'axios';
import { BACKEND_URL } from './constants/default';
import axiosService from './axios/axiosService';
import { addToCart } from './redux/reducers/cartReducer';
// main; shop; cart; login; profile; detailed good
const App = () => {
  
  var dispatch = useDispatch();
  const carts = useSelector(cart=> cart.cart);
  const getAllProducts = async () => {
    let result = await axiosService.setProduct(0);
    dispatch(setProducts({
      type: "set_items",
      payload: result.data
    }));
  }

  useEffect(() => {
    getAllProducts();

    let savedCarts= JSON.parse(localStorage.getItem("cart"));
    if(carts && carts.length == 0 && savedCarts && savedCarts.length > 0) 
    {
      for(var i = 0; i < savedCarts.length; i++) {
        console.log(savedCarts[i]);
        dispatch(addToCart(savedCarts[i]))
      }
    }
  },
    []);

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              {
                routes.map((element, key) => {
                  return (
                    <Route key={"route" + key.toString()} exact={true} path={element.path} element={<element.container />} />
                  );
                })
              }
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
  );
}

export default App;
