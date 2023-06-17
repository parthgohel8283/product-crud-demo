import "./App.css";
import { ProductProvider } from "./context/productContext";
import Product from "./pages/product/product";

function App() {
  return (
    <ProductProvider>
      <Product />
    </ProductProvider>
  );
}

export default App;
