import React, { useState, useEffect } from 'react'
import axios from 'axios'//ใช้ในการใช้เรียก ข้อมูลจาก mogodb
import { Container, Row, Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //เรียกใช้ FontAwesomeIcon
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; //เรียกใช้ faEdit, faTrash
import confirm from "reactstrap-confirm";
const ProductList = () => {
    const [product, setProduct] = useState([]);//ประกาศตัวแปล product แล้ว setProduct ตัวเก็บข้อมูลใหม่
    const updataProduct = () => {
        axios.get("https://api61425048.herokuapp.com/product") //เรียกข้อมูลทั้งหมดออกมา
            .then((response) => {
                setProduct(response.data.product);
                console.log("Yessssssssss .........");
            });
    };
    useEffect(() => {
        updataProduct();
    }, [])
    const deleteProduct = async (productId, productName) => { // function ลบข้อมูล 
        let result = await confirm(
            {
                tetle: <>confirm</>,
                message: "ลบ " + productName + " ? ", //ข้อความแจ้งเตือน 
                confirmText: "ใช่", //ปุ่มตกลง
                confirmColor: "primary",// สีปุ่ม
                cancelText: "ไม่", // ปุ่มยกเลิก
                cancelColor: "danger"// สีปุ่ม
            }
        );
        if (result) {
            axios.delete("https://api61425048.herokuapp.com/product/" + productId) //เลือกลบจากไอดี
                .then((response) => {
                    updataProduct();//เรียกใช้ฟังชั่น update
                }
                )
        }
    }
    return (
        <Container>
            <h3>Product List</h3>
            <Row>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category </th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product) => { // เรียกข้อมูลออกมาทั้งหมด โดยวนข้อมูลที่ละชุด
                            return (
                                <tr key={product._id}>
                                    {/* เลือกจากไอดี */}
                                    <td>{product.name}</td>
                                    {/* แสดงชื่อ */}
                                    <td>{product.category}</td>
                                    {/* แสดงหมวดหมู่ */}
                                    <td>{product.price}</td>
                                    {/* แสดงราคา */}
                                    <td>

                                        <Button color="success mr-2" href={"/edit/" + product._id}><FontAwesomeIcon icon={faEdit} />Edit</Button>
                                        {/* ปู่มแก้ไข เลือกจาก ID */}
                                        <Button color="danger" onClick={() => deleteProduct(product._id, product.name)} ><FontAwesomeIcon icon={faTrash} />Delete</Button>
                                        {/* ปู่มลบ เลือกจาก ID */}
                                    </td>
                                </tr>)
                        })}

                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default ProductList
