/**
 * Written by minhhq
 */

package com.backend.project.controller;

import com.backend.project.model.PaymentLog;
import com.backend.project.model.Products;
import com.backend.project.payload.response.CountResponse;
import com.backend.project.payload.response.MessageResponse;
import com.backend.project.repository.PaymentLogRepository;
import com.backend.project.repository.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/")
public class ProductController {
    private static Logger logger = Logger.getLogger(ProductController.class);

    @Autowired
    private PaymentLogRepository paymentLogRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/products")
    public Page<Products> getProduct(Pageable pageable) {
        logger.info("Getting all product!");
        return productRepository.findIncludeImage(pageable);
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody Products products) {
        if (productRepository.existsByProductName(products.getProductname()) == 1) {
            logger.error("Error: Products is already added!");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Products is already added!"));
        }
        if(products.getProductname().contains("'")){
            products.setProductname(products.getProductname().replace("'", "''"));
        }
        try {
            jdbcTemplate.update("INSERT INTO PRODUCTS (CATEGORY, PRODUCTNAME, DESCRIPTION, PRICE, QUANTITY, COUNT) VALUES ('" + products.getCategory() + "', '" + products.getProductname() + "', '" + products.getDescription() + "', " + products.getPrice() + ", '" + products.getQuantity() + "', '1')");
            jdbcTemplate.update("INSERT INTO PRODUCTIMAGE (IMAGE1, IMAGE2, IMAGE3, IMAGE4, PRODNAME) VALUES ('" + products.getImage1() + "', '" + products.getImage2() + "', '" + products.getImage3() + "', '" + products.getImage4() + "', '" + products.getProductname() + "')");
            jdbcTemplate.update("UPDATE PRODUCTIMAGE SET PROID = (SELECT ID FROM PRODUCTS WHERE products.productname = '" + products.getProductname() + "') WHERE prodname = '" + products.getProductname() + "'");
            logger.info("Products added successfully!");
            return new ResponseEntity<>(new MessageResponse("Products added successfully!"), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Products added failed!"));
        }
    }

    @PutMapping("/products")
    public ResponseEntity<?> updateProduct(@RequestBody Products products) {
        if (productRepository.existsByID(products.getId()) == 0) {
            logger.error("Error: Products is already not in the Database");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Products is already not in the Database!"));
        }
        jdbcTemplate.update("UPDATE PRODUCTS SET PRODUCTNAME = '" + products.getProductname() + "', DESCRIPTION = '" + products.getDescription() + "', PRICE = " + products.getPrice() + "  WHERE ID = '" + products.getId() + "'");
        jdbcTemplate.update("UPDATE PRODUCTIMAGE SET IMAGE1 = '" + products.getImage1() + "', IMAGE2 = '" + products.getImage2() + "', IMAGE3 = '" + products.getImage3() + "', IMAGE4 = '" + products.getImage4() + "', PRODNAME = '" + products.getProductname() + "'  WHERE PROID = '" + products.getId() + "'");
        logger.info("Products Update successfully!");
        return new ResponseEntity<>(new MessageResponse("Products Update successfully!"), HttpStatus.OK);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(value = "id") int id) {
        logger.info("Delete product id: " + id);
        jdbcTemplate.update("DELETE FROM PRODUCTS WHERE ID = " + id + "");
        jdbcTemplate.update("DELETE FROM PRODUCTIMAGE WHERE PROID = " + id + "");
        return new ResponseEntity<>(new MessageResponse("Products deleted successfully!"), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public List<Products> getProductByID(@PathVariable(value = "id") int id) {
        logger.info("Getting product by id: " + id);
        return this.productRepository.findByProID(id);
    }

    @GetMapping("/products/category/{category}")
    public Page<Products> getProductByCate(@PathVariable(value = "category") String category, Pageable pageable) {
        logger.info("Getting product by category: " + category);
        return this.productRepository.findByCategory(category, pageable);
    }

    @GetMapping("/products/Rcategory/{category}")
    public List<Products> getRandomProductByCate(@PathVariable(value = "category") String category) {
        logger.info("Getting randomly product by category: " + category);
        return this.productRepository.findRandomByCategory(category);
    }

    @GetMapping("/products/productname/{productname}")
    public List<Products> getProductByName(@PathVariable(value = "productname") String productname) {
        logger.info("Getting product by name!");
        return this.productRepository.findByProductname(productname);
    }

    @GetMapping("/products/search/{productname}")
    public List<Products> searchProdName(@PathVariable(value = "productname") String productname) {
        logger.info("Search product: " + productname);
        return this.productRepository.searchShop(productname.toLowerCase(Locale.ROOT));
    }

    @GetMapping("/products/adminsearch/{productname}")
    public Page<Products> searchAdminProdName(@PathVariable(value = "productname") String productname, Pageable pageable) {
        logger.info("Search product: " + productname);
        return this.productRepository.searchAdminShop(productname.toLowerCase(Locale.ROOT), pageable);
    }

    @GetMapping("/order/{username}/success")
    public List<PaymentLog> findSuccessTransaction(@PathVariable(value = "username") String username) {
        logger.info("Find success purchased of the user: " + username);
        return this.paymentLogRepository.findSuccess(username);
    }

    @GetMapping("/order/{username}/cancel")
    public List<PaymentLog> findCancelTransaction(@PathVariable(value = "username") String username) {
        logger.info("Find cancel purchased of the user: " + username);
        return this.paymentLogRepository.findCancle(username);
    }

    @GetMapping("/supp/count")
    public ResponseEntity<?> countSupp() {
        int num = this.productRepository.countNumofSupp();
        return new ResponseEntity<>(new CountResponse(num), HttpStatus.OK);
    }

    @GetMapping("/appa/count")
    public ResponseEntity<?> countAppa() {
        int num = this.productRepository.countNumofAppa();
        return new ResponseEntity<>(new CountResponse(num), HttpStatus.OK);
    }

    @GetMapping("/asse/count")
    public ResponseEntity<?> countAsse() {
        int num = this.productRepository.countNumofAsse();
        return new ResponseEntity<>(new CountResponse(num), HttpStatus.OK);
    }

}
