/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "category")
    private String category;

    @Column(name = "productname")
    private String productname;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private float price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "proid")
    private int proid;

    @Column(name = "image1")
    private String image1;

    @Column(name = "image2")
    private String image2;

    @Column(name = "image3")
    private String image3;

    @Column(name = "count")
    private int count;

    public String getProdname() {
        return prodname;
    }

    public void setProdname(String prodname) {
        this.prodname = prodname;
    }

    @Column(name = "prodname")
    private String prodname;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getProid() {
        return proid;
    }

    public void setProid(int proid) {
        this.proid = proid;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public String getImage4() {
        return image4;
    }

    public void setImage4(String image4) {
        this.image4 = image4;
    }

    @Column(name = "image4")
    private String image4;

    public Products() {

    }

    public Products(String category, String productname, String description, float price, int quantity, String image1, String image2, String image3, String image4, int count, String prodname) {
        this.category = category;
        this.productname = productname;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.count = count;
        this.prodname = prodname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productName) {
        this.productname = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
