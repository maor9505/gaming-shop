import React, {useContext, useEffect,useState  } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { useParams } from 'react-router-dom';
import '../styles/ProductPage.css'
import { CartContext } from '../Global/CartContext'
import { HomeProducts } from './HomeProducts';

export const ProductPage = () => {
    const { dispatch } = useContext(CartContext);
    const { products } = useContext(ProductsContext);
    const [product, setproduct] = useState();
    const {id}= useParams();
    useEffect(() => {
        const product = products.find((product) => product.ProductID == id);
        setproduct(product) 
    },[products])
        return (
            <>
            <>
                {!product && <div>slow internet...no products to display</div>}
                 {product &&  <div className="container">
                <div className="single_product">
                            <div className="container">
                        <div className="row">
                            <div className="col-lg-4 order-lg-2 order-1">
                                <div className="image_selected">
                                    <img src={product.ProductImg} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6 order-3">
                                <div className="product_description">
                                    <div className="product-name">
                                        {product.ProductName}
                                    </div>
                                    <hr className="singleline" />
                                    <div>
                                        <span className="product_price"> Price:  {product.ProductPrice}$</span>
                                    </div>
                                    <hr className="singleline" />
                                    <div>
                                        <h3>Category:&ensp;{product.Catagory}</h3>
                                         <hr className="singleline" />
                                            <h3>Age Category:&ensp;{(product.CatagoryAge == 1)?'3-16': '16-99'}</h3>
                                                <hr className="singleline" />
                                        <h3>Description:&ensp;{product.Description}</h3>
                                                <hr className="singleline" />
                                        <h3>Views:&ensp;{product.Views}</h3>
                                                <hr className="singleline" />

                                    </div>
                                            <button className='btn btn-outline-success  btn-lg mt-3 float-left' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>} 
            </>
            <h1></h1>
                <div className='container'>
                    <h1>More Products...</h1>
                    <HomeProducts />
                </div>
            </>
        );
    }
