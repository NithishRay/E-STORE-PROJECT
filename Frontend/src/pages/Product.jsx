import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import {useParams} from 'react-router-dom'
import Breadcrumb from '../components/breadcrumbs/Breadcrumb';
import Productdisplay from '../components/productdisplay/Productdisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import Relatedproducts from '../components/Relatedproducts/Relatedproducts';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId));

  return (
    <div>
      <Breadcrumb product={product}/>
      <Productdisplay product={product}/>
      <DescriptionBox/>
      <Relatedproducts/>
    </div>
  )
}

export default Product