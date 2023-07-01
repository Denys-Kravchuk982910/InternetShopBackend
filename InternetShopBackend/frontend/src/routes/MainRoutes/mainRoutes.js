import React from "react";
import { createBrowserRouter } from "react-router-dom";


const Main = React.lazy(() => import("../../components/MainLayout/Main/Main"));
const Catalog = React.lazy(() => import("../../components/MainLayout/Catalog/Catalog"));
const Feedbacks = React.lazy(() => import("../../components/MainLayout/Feedback/index"));
const Blog = React.lazy(() => import("../../components/MainLayout/Blog/index"));
const Product = React.lazy(() => import("../../components/MainLayout/Product/index"));
const Order = React.lazy(() => import("../../components/MainLayout/Order/index"));


export const routes = [
   //main
    {path: '/feedbacks', container:Feedbacks },
    {path: '/catalog', container: Catalog},
    {path: '/blog', container: Blog},
    {path: '/product', container: Product},
    {path: '/order', container: Order},
    {path: '/', container: Main}
];