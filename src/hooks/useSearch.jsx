import { useState, useRef } from 'react';
import axios from 'axios';
import useProducts from './useProducts';

const useSearch = () => {
  const { products, isLoading, error, refetch } = useProducts()
  const [newProducts, setNewProducts] = useState([])
  const [noResult, setNoResult] = useState("")


  const handleKeyUp = (event) => {
    if (event?.target?.value) {
      const searchResults = products.filter(product => product.name.toLowerCase().includes(event?.target?.value.toLowerCase()))
      console.log(searchResults)
      if (searchResults.length !== 0) {
        setNewProducts(searchResults)
        setNoResult("")
      }
      else {
        setNoResult("No Data Found!")
        setNewProducts([])
      }
    }
    else {
      setNewProducts(products)
    }
  }
  const handleKeyUpCode = (event) => {
    if (event?.target?.value) {
      const searchResults = products.filter(product => product.code.toLowerCase().includes(event?.target?.value.toLowerCase()))
      console.log(searchResults)
      if (searchResults.length !== 0) {
        setNewProducts(searchResults)
        setNoResult("")
      }
      else {
        setNoResult("No Data Found!")
        setNewProducts([])
      }
    }
    else {
      setNewProducts(products)
    }
  }


  return { handleKeyUp, newProducts, setNewProducts, noResult ,handleKeyUpCode};
};

export default useSearch;

