import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import Signup from './user/authentication/signUp/Signup';
import Signin from './user/authentication/signIn/Signin';
import Home from './core/home/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/dashboard/userDashboard/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/dashboard/adminDashboard/AdminDashboard';
import AddCategory from './admin/addCategory/AddCategory';
import AddProduct from './admin/product/addProduct/AddProduct';
import Shop from './core/shop/Shop';
import Product from './core/product/Product';
import CartSummary from './core/cartSummary/CartSummary';
import CartPopup from './core/cartPopup/CartPopup';
import Orders from './admin/orders/Orders';
import Profile from './user/profile/Profile';
import ManageProducts from './admin/product/manageProduct/ManageProducts';
import UpdateProduct from './admin/product/updateProduct/UpdateProduct';

const store = configureStore();

const Routes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute path="/create/category" exact component={AddCategory} />
          <AdminRoute path="/create/product" exact component={AddProduct} />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/checkout" exact component={CartSummary} />
          <Route path="/cart" exact component={CartPopup} />
          <AdminRoute path="/admin/orders" exact component={Orders} />
          <PrivateRoute path="/profile/:userId" exact component={Profile} />
          <PrivateRoute
            path="/admin/products"
            exact
            component={ManageProducts}
          />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
