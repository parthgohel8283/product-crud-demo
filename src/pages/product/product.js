import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/customPagination/pagination";
import { ProductContext } from "../../context/productContext";
import EditProductForm from "./editProductForm/editProductForm";
import styles from "./product.module.css";

function Product() {
  const {
    productData,
    currentPage,
    setCurrentPage,
    totalPage,
    deleteProduct
  } = useContext(ProductContext);

  const [editData, setEditData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    console.log("productData", productData);
  }, [productData]);

  return (
    <div className={styles.container}>
      <EditProductForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        editData={editData}
        setEditData={setEditData}
      />
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            {["", "Title", "Discount Price", "Action"].map((data, idx) => {
              return (
                <th key={idx} style={{ width: idx === 0 ? "10%" : "25%" }}>
                  {data.toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {productData?.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: "15px" }}>
                <img
                  src={product.thumbnail}
                  alt="image not found"
                  style={{ width: "100%" }}
                />
              </td>
              <td>{product.title}</td>
              <td>
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </td>
              <td>
                <div className={styles.actionButtons}>
                  <button
                    onClick={() => {
                      setOpenEditModal(true);
                      setEditData(product);
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{ background: "#a3a3a3" }}
                  >
                    DELETE
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        lastPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Product;
