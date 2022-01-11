import React from 'react'
import './Products.css'
const Products = (props) => {
    return (
        <div className="productContainer">{
            props.product.map((prod)=> 
            <div key={prod.id} className="product">
            <h3 className="text-center">{prod.name}</h3>
            <p className="text-center">{prod.description}</p>
            <h5 className="text-center">₹{prod.price}</h5>
            <button className="text-center text-white btn bg-primary btn-btn-block" onClick={()=>props.payNow(prod.id)}>PayNow ₹100</button>
        </div>
            )
        }
           
        </div>
    )
}

export default Products
