/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {
    @Query(
            value = "SELECT * FROM products INNER join productimage on products.id = productimage.proid WHERE CATEGORY = ?1", nativeQuery = true)
    Page<Products> findByCategory(@Param("category") String category, Pageable pageable);

    @Query(
            value = "SELECT * FROM (SELECT * FROM PRODUCTS INNER join productimage on products.id = productimage.proid ORDER BY DBMS_RANDOM.RANDOM) WHERE CATEGORY = ?1 and ROWNUM < 3", nativeQuery = true)
    List<Products> findRandomByCategory(@Param("category") String category);
    @Query(
            value = "SELECT * FROM products INNER join productimage on products.id = productimage.proid WHERE ID = ?1", nativeQuery = true)
    List<Products> findByProID(@Param("id") int id);

    @Query(
            value = "SELECT * FROM products INNER join productimage on products.id = productimage.proid WHERE PRODUCTNAME = ?1", nativeQuery = true)
    List<Products> findByProductname(@Param("productname") String productname);

    @Query(
            value = "SELECT * FROM products INNER join productimage on products.productname = productimage.prodname", nativeQuery = true)
    Page<Products> findIncludeImage(Pageable pageable);

    @Query(
            value = "SELECT COUNT(*) FROM products WHERE PRODUCTNAME = ?1", nativeQuery = true)
    int existsByProductName(@Param("productname") String productname);

    @Query(
            value = "SELECT COUNT(*) FROM products WHERE ID = ?1", nativeQuery = true)
    int existsByID(@Param("id") long ID);

    @Query(
            value = "SELECT * FROM products INNER join productimage on products.productname = productimage.prodname WHERE LOWER(PRODUCTNAME) LIKE '%'||?1||'%' OR LOWER(PRICE) LIKE '%'||?1||'%' OR LOWER(CATEGORY) LIKE '%'||?1||'%'", nativeQuery = true)
    List<Products> searchShop(@Param("productname") String productname);

    @Query(
            value = "SELECT * FROM products INNER join productimage on products.productname = productimage.prodname WHERE LOWER(PRODUCTNAME) LIKE '%'||?1||'%' OR LOWER(PRICE) LIKE '%'||?1||'%' OR LOWER(CATEGORY) LIKE '%'||?1||'%'", nativeQuery = true)
    Page<Products> searchAdminShop(@Param("productname") String productname, Pageable pageable);

    @Query(
            value = "select count(*) from products where category = 'supplement'", nativeQuery = true)
    int countNumofSupp();

    @Query(
            value = "select count(*) from products where category = 'apparel'", nativeQuery = true)
    int countNumofAppa();

    @Query(
            value = "select count(*) from products where category = 'accessories'", nativeQuery = true)
    int countNumofAsse();
}