const productServices = {
  getAllProducts: (page) =>
    fetch(
      `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
    ).then((res) => res.json()),

  addProduct: (data) =>
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((res) => res.json()),

  updateProduct: (productId, data) =>
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((res) => res.json()),

  deleteProduct: (productId) =>
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE"
    }).then((res) => res.json())
};

export default productServices;
