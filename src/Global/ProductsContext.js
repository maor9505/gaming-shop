import React, { createContext } from 'react'
import { db } from '../Config/Config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }
    // mklmklmklml
    // const getProduct = (doc) => {
    //     return {
    //         ProductID: doc.id,
    //         ProductName: change.doc.data().ProductName,
    //         ProductPrice: change.doc.data().ProductPrice,
    //         ProductImg: change.doc.data().ProductImg,
    //         Description: change.doc.data().Description,
    //         Views: change.doc.data().Views,
    //         CatagoryAge: change.doc.data().CatagoryAge,
    //         Catagory: change.doc.data().Catagory,
    //         UplodeDate: change.doc.data().UplodeDate,
    //         DateCreate: change.doc.data().DateCreate
    //     }
    // }
    

    componentDidMount() {
        const prevProducts = this.state.products;
        //
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                        Description: change.doc.data().Description,
                        Views: change.doc.data().Views,
                        CatagoryAge: change.doc.data().CatagoryAge,
                        Catagory: change.doc.data().Catagory,
                        UplodeDate: change.doc.data().UplodeDate,
                        DateCreate: change.doc.data().DateCreate
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })

        })

    }
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

