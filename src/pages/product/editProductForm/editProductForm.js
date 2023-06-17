import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/productContext";
import styles from "./editProductForm.module.css";

function EditProductForm({
  openEditModal,
  setOpenEditModal,
  editData,
  setEditData
}) {
  const { updateProduct } = useContext(ProductContext);
  const [formData, setFormData] = useState({});
  const [validation, setValidation] = useState({
    title: true,
    price: true
  });
  useEffect(() => {
    if (openEditModal) setFormData(editData);
  }, [editData]);

  const handelChange = (event) => {
    setValidation({
      ...validation,
      [event.target.name]: event.target.value.trim() ? true : false
    });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdate = () => {
    if (validation.title && validation.price) {
      const { id, title, price } = formData;
      updateProduct(id, { title, price: Number(price) });
      setOpenEditModal(false);
    }
  };

  return openEditModal ? (
    <div
      className={styles.modalContainer}
      onClick={() => {
        setOpenEditModal(false);
        setEditData(null);
      }}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <form>
          <div className={styles.formControl}>
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={handelChange}
              name="title"
              required
            />
            {!validation.title && (
              <p className={styles.errorText}>Title is Required</p>
            )}
          </div>
          <div className={styles.formControl}>
            <label>Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={handelChange}
              name="price"
              required
            />
            {!validation.price && (
              <p className={styles.errorText}>Price is Required</p>
            )}
          </div>
        </form>
        <div className={styles.actionButtons}>
          <button
            onClick={handleUpdate}
            style={{
              background:
                !validation.title || !validation.price ? "#85a9b3" : "#187e96"
            }}
          >
            Update
          </button>
          <button
            style={{ background: "#a3a3a3" }}
            onClick={() => {
              setOpenEditModal(false);
              setEditData(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditProductForm;
