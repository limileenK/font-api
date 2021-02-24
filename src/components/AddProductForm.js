import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container, Button, Form, FormGroup, Label, Input, FormText, Row, Alert } from 'reactstrap';
import Swal from 'sweetalert2'
const AddProductForm = () => {
    const initProduct = { // ประกาศตัวแปลให้ ข้อมูลเป็นค่าว่าง
        name: "",
        category: "",
        price: "",
        tags: []
    };

    const [product, setProduct] = useState(initProduct);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        // if (name === "tags") {
        //     value = value.split(",")
        // }
        setProduct({ ...product, [name]: value });

    }
    const saveProduct = () => { // เพิ่มข้อมูลเข้า mogodb
        var data = {
            name: product.name, //ตัวแปลเก็บค่า ที่จะเพิ่ม
            category: product.category,//ตัวแปลเก็บค่า ที่จะเพิ่ม
            price: product.price,//ตัวแปลเก็บค่า ที่จะเพิ่ม
            tags: product.tags//ตัวแปลเก็บค่า ที่จะเพิ่ม
        }
        axios.post("https://api61425048.herokuapp.com/product", data) //ส่งข้อมูล
            .then((response) => {
                console.log(response.data);
                setSubmitted(true);
            })
            .catch((error) => {
                console.log(console.error())
            })
        // Swal.fire({
        //     title: 'เพิ่มแล้วน่ะจร้ะ',
        //     text: 'ลุงรักทุกคน',
        //     imageUrl: 'https://scontent.fbkk4-1.fna.fbcdn.net/v/t31.0-8/26116415_1855330444498531_571239808903163731_o.jpg?_nc_cat=107&ccb=2&_nc_sid=730e14&_nc_eui2=AeGspw3mLEmwPSiAn08ZZSxe__04FMm1sVf__TgUybWxV0ZUKCNjMcCp5Rdhop6FZ1hoLa8FpH6NPGDjFYhABCqC&_nc_ohc=1vNe4TvRFGAAX9C5YKm&_nc_oc=AQnX3v-Ce_0LVfPXY1wFNxp01dIRtxzKFnjFE7SQhlIjrXN5PW2wDV_UWM_jY8E94bA&_nc_ht=scontent.fbkk4-1.fna&oh=a1cc0830ca2c669fee3b2b88bbfa3da5&oe=60411372',
        //     imageWidth: 1200,
        //     imageHeight: 500,
        //     imageAlt: 'Custom image',
        //   })
    };
    const newProduct = () => {
        setProduct(initProduct);//เรียกฟั้งชั่น
        setSubmitted(false);//กำหนด ค่าให้เป็น false
    }
    return (
        <>
            <Container>
                <Row>Add</Row>
                <Row>
                    {submitted ? (<Alert color="primary"> 
                    {/* เงื่อนไข เมือเพิ่มเสร็จ  */}
                        เพิ่มแล้วน่ะจร้ะ
                        <Button color="success" onClick={newProduct}>เพิ่มอีก</Button> 
                        {/* เรียกใช้ newProduct */}
                    </Alert>) : (<Form>
                        <FormGroup>
                            <Label for="productName">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="productName"
                                value={product.name || ""} //ค่าของชื่อ  หรือ ค่าว่าง
                                onChange={handleInputChange}
                                placeholder="ระบุชื่อ" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productCategory">Category</Label>
                            <Input
                                type="text"
                                name="category"
                                id="productCategory"
                                value={product.category || ""} //ค่าของหมวดหมู่  หรือ ค่าว่าง
                                onChange={handleInputChange}
                                placeholder="ระบุหมวดหมู่" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productPrice">Price</Label>
                            <Input
                                type="text"
                                name="price"
                                id="producPrice"
                                value={product.price || ""}  //ค่าของราคา  หรือ ค่าว่าง
                                onChange={handleInputChange}
                                placeholder="ระบุราคา" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productTags">Tags</Label>
                            <Input
                                type="text"
                                name="tags"
                                id="productTags"
                                value={product.tags || ""} //ค่าของtags  หรือ ค่าว่าง
                                onChange={handleInputChange}
                                placeholder="ระบุ tags" />
                        </FormGroup>
                        <Button color="success" onClick={saveProduct}>AddProduct</Button> 
                        {/* เรียกใช้ฟั้งชั่น  saveProduct*/}
                    </Form>
                        )}
                </Row>
            </Container>
        </>
    )
}

export default AddProductForm
