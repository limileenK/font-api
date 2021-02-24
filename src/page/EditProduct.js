import React from 'react'
import EditProductForm from "../components/EditProductForm"

const EditProduct = (props) => {
  return (
    <>
      <main>
        <EditProductForm id={props.match.params.id} />
        {/* เลือก ID ที่ตรงกัน มาโชว์ */}
      </main>
    </>
  );
};

export default EditProduct
