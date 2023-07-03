import { useState } from "react";
import Header from "./Header";
import Product from "./Product";

export default function ProductList({
  productList,
  onDeleteProduct,
  onSave,
  userProfile,
}) {
  const [filteredProductList, setFilteredProductList] = useState(productList);

  const handleProductSearch = (e) => {
    const input = e.target.value;
    const matchedProducts =
      input === ""
        ? productList
        : productList?.filter((product) =>
            product.name?.includes(input)
          );

    setFilteredProductList(matchedProducts);
  };

  return (
    <div>
      <Header userProfile={userProfile} />
      <br />
      <div className="col-md-12 text-center">
        {userProfile?.is_admin && (
          <div className="col-md-12 text-center">
          <input
            type="text"
            placeholder="Search here"
            onChange={handleProductSearch}
             />
            <a href="/addproduct" type="button" className="btn btn-primary">
              Add product
            </a>
          </div>
        )}
      </div>
      <br></br>
      <div className="justify-center flex flex-wrap gap-3">
        {(filteredProductList ? filteredProductList : productList)?.map((product) => (
          <Product
            key={product.id}
            isAdmin={userProfile?.is_admin}
            product={product}
            onSave={onSave}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}
