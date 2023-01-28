/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "payment_log")
public class PaymentLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentid;

    @Column(name = "username")
    private String username;

    @Column(name = "description")
    private String description;

    @Column(name = "total")
    private String total;

    @Column(name = "image")
    private String image;

    @Column(name = "payment_time")
    private String payment_time;

    public String getPayment_time() {
        return payment_time;
    }

    public void setPayment_time(String payment_time) {
        this.payment_time = payment_time;
    }

    public long getPaymentid() {
        return paymentid;
    }

    public void setPaymentid(long paymentid) {
        this.paymentid = paymentid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public PaymentLog(String username, String description, String total, String image, String payment_time) {
        this.username = username;
        this.description = description;
        this.total = total;
        this.image = image;
        this.payment_time = payment_time;
    }

    public PaymentLog(){
    }
}
