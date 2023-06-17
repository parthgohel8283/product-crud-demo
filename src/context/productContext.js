import { createContext, useEffect, useState } from "react";
import productServices from "../services/product";

export const ProductContext = createContext({
  productData: [],
  currentPage: 1,
  setCurrentPage: () => null,
  totalPage: 1,
  updateProduct: () => null,
  deleteProduct: () => null
});

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    productServices
      .getAllProducts(currentPage)
      .then((res) => {
        setProductData(res.products);
        setTotalPage(res.total / 10);
        console.log(res.products);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setProductData([]);
  }, [currentPage]);

  useEffect(() => {
    console.log("productData from hoc", productData);
  }, [productData]);

  const updateProduct = (productId, product) => {
    productServices.updateProduct(productId, product).then((res) => {
      console.log("productUpdated", res);
      let _productData = [...productData];
      const productIndex = productData.findIndex(
        (item) => item.id === productId
      );
      _productData[productIndex] = {
        ..._productData[productIndex],
        ...product
      };

      setProductData([..._productData]);
    });
  };

  const deleteProduct = (productId) => {
    productServices.deleteProduct(productId).then((res) => {
      console.log("productDeleted", res);
      let _productData = [...productData];
      _productData.splice(
        productData.findIndex((item) => item.id === productId),
        1
      );
      setProductData([..._productData]);
    });
  };

  return (
    <ProductContext.Provider
      value={{
        productData,
        currentPage,
        setCurrentPage,
        totalPage,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
