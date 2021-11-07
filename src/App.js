import React from "react";
import { Navbar } from "./Components/common/Navbar";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { Home } from "./Components/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { Signup } from "./Components/auth/Signup";
import { Login } from "./Components/auth/Login";
import { NotFound } from "./Components/common/NotFound";
import { Cart } from "./Components/Cart";
import { CartContextProvider } from "./Global/CartContext";
import { AddProducts } from "./Components/admin/AddProducts";
import { ProductPage } from "./Components/ProductPage";
import { AddCatagory } from "./Components/admin/AddCatagory";
import { Products } from "./Components/Products";
import { ViewsProducts } from "./Components/ViewsProducts";
import { Footer } from "./Components/Footer";
import { UserProfile } from "./Components/UserProfile";
import { UserContextProvider } from "./Global/UserContext";
import { Contact } from "./Components/common/Contact";
import { Orders } from "./Components/Orders";
import { OrderPage } from "./Components/OrderPage";
import { OrderContextProvider } from "./Global/OrderContext";
import ScrollToTop from "./Utils/ScrollToTop";

export const App = () => {
  return (
    <React.Fragment>
      <ScrollToTop/>
      <UserContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <Navbar />
              <Switch>
                {/* home */}
                <Route exact path="/" component={Home} />
                {/* signup */}
                <Route path="/signup" component={Signup} />
                {/* login */}
                <Route path="/login" component={Login} />
                {/* cart products} */}
                <Route path="/cart" component={Cart} />
                {/*  ProductPage  } */}
                <Route path="/products/:id" component={ProductPage}></Route>
                {/*  Order Page  } */}
                <Route path="/OrderPage/:id" component={OrderPage}></Route>
                {/*  Products } */}
                <Route path="/products" component={Products}></Route>
                {/*  Views Products } */}
                <Route path="/viewsproducts" component={ViewsProducts}></Route>
                {/*  User Profile} */}
                <Route path="/userprofile" component={UserProfile}></Route>
                {/* add products */}
                <Route path="/addproducts" component={AddProducts} />
                {/* add products */}
                <Route path="/addcatagory" component={AddCatagory} />
                {/* Contact */}
                <Route path="/contact" component={Contact} />
                {/* Contact */}
                <Route path="/orders" component={Orders} />
                {/* not-found */}
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/" />
                <Redirect to="/not-found" />
              </Switch>
              <Footer />
            </OrderContextProvider>
          </CartContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>
    </React.Fragment>
  );
};

export default App;
