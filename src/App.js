import React, { useState, useEffect, useContext } from 'react'
import { Navbar } from "./Components/common/Navbar";

import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Signup } from './Components/auth/Signup'
import { Login } from './Components/auth/Login';
import { NotFound } from './Components/NotFound';
import { auth, db } from './Config/Config'
import { Cart } from './Components/Cart';
import { CartContextProvider } from './Global/CartContext'
import { AddProducts } from './Components/admin/AddProducts';
import { ProductPage } from './Components/ProductPage';
import { AddCatagory } from "./Components/admin/AddCatagory";
import { Products } from './Components/Products';
import { ViewsProducts } from './Components/ViewsProducts';
import { Footer } from './Components/Footer';
import { LoadingPage } from './Components/loading-page/LoadingPage';
import { useHistory } from 'react-router-dom';
import { UserProfile } from './Components/UserProfile';
import { isEmpty } from 'lodash';

export const App = () => {

  const [user, setUser] = useState();
  //   // { uid: "", email: "", displayName: "", type: "", phone: "",},
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // getting user info for navigation bar
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.photoURL)
        db.collection('users').doc(user.uid).get().then(snapshot => {
          setUser(
            {
              uid: user.uid,
              email: snapshot.data().Email,
              type: snapshot.data().Type,
              phone: snapshot.data().PhoneNumber,
              name: snapshot.data().DisplayName,
              providerId: user.providerData[0].providerId,
              photoURL: (!isEmpty(user.photoURL)) ? user.photoURL : 'null'
            },
          )
        })
      }
      else {
        setUser(null)
      }
    })
    setTimeout(() => { setSpinner(false) }, 4000);
    history.push('/');
    setTimeout(() => { setSpinner(false) }, 4000);

  }, []);


  return (

    <React.Fragment>
      <ProductsContextProvider>
        <CartContextProvider>
          {spinner && <LoadingPage />}
          {!spinner && <div><Navbar user={user} />

            <Switch>
              {/* home */}
              <Route exact path='/' component={() => <Home user={user} />} />
              {/* signup */}
              <Route path="/signup" component={Signup} />
              {/* login */}
              <Route path="/login" component={Login} />
              {/* cart products} */}
              <Route path="/cart" component={() => <Cart user={user} />} />
              {/*  ProductPage  } */}
              <Route path="/products/:id" component={ProductPage}></Route>
              {/*  Products } */}
              <Route path="/products" component={Products}></Route>
              {/*  Views Products } */}
              <Route path="/viewsproducts" component={ViewsProducts}></Route>
              {/*  User Profile} */}
              <Route path="/userprofile" component={() => <UserProfile user={user} />} ></Route>
              {/* add products */}
              <Route path="/addproducts" component={AddProducts} />
              {/* add products */}
              <Route path="/addcatagory" component={AddCatagory} />
              {/* not-found */}
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/" />
              <Redirect to="/not-found" />
            </Switch>
            <Footer />
          </div>}
        </CartContextProvider>
      </ProductsContextProvider>
    </React.Fragment>
  )
}


export default App


