/**
 * Written by minhhq
 */

package com.backend.project.controller;

import com.backend.project.PaypalCofiguration.PaypalService;
import com.backend.project.model.Linktemp;
import com.backend.project.model.Order;
import com.backend.project.repository.LinkTempRepository;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PaypalController {
    public String globalVar;
    public int IcreNum = 1410;
    public double price;
    public String Desc;
    public String CurrentUser;
    public String image;

    @Autowired
    LinkTempRepository linkTempRepository;

    @Autowired
    PaypalService service;

    @Autowired
    JdbcTemplate jdbcTemplate;

    public static final String SUCCESS_URL = "pay/success";
    public static final String CANCEL_URL = "pay/cancel";

    private static Logger logger = Logger.getLogger(PaypalController.class);

    @PostMapping("/pay")
    public String payment(@RequestBody Order order) {
        logger.info("Price: " + order.getPrice());
        logger.info("Description: " + order.getDescription());
        try {
            Payment payment = service.createPayment(order.getPrice(), "USD", "paypal",
                    "SALE", order.getDescription(), "http://localhost:1999/" + CANCEL_URL,
                    "http://localhost:1999/" + SUCCESS_URL);
            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    price = order.getPrice();
                    Desc = order.getDescription();
                    CurrentUser = order.getUsername();
                    globalVar = link.getHref();
                    image = order.getImage();
                    jdbcTemplate.update("INSERT INTO LINKTEMP (TID, LINK) VALUES ('" + IcreNum + "', '" + globalVar + "')");
                    return "redirect:" + link.getHref();
                }
            }

        } catch (PayPalRESTException e) {

            e.printStackTrace();
        }
        return "redirect:/";
    }

    @GetMapping("/link")
    public List<Linktemp> getLink() {
        return linkTempRepository.findLink();
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        logger.info("Payment Cancel");
        if(Desc.contains("'")){
            Desc = Desc.replace("'", "''");
        }
        jdbcTemplate.update("INSERT INTO PAYMENT_LOG (USERNAME, DESCRIPTION, TOTAL, STATUS, IMAGE) VALUES ('" + CurrentUser + "', '" + Desc + "', " + price + ", 'CANCEL', '" + image + "')");

        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\" />\n" +
                "    <title>Paypal</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<h1>Payment Cancle</h1>\n" +
                "<p>Click to go back to Cart: <a href=\"http://localhost:3000/cart\">Back</a></p>\n" +
                "</body>\n" +
                "</html>";
    }

    @GetMapping(SUCCESS_URL)
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            logger.info("Payment Success");
            Payment payment = service.executePayment(paymentId, payerId);
            logger.info(payment.toJSON());
            if (payment.getState().equals("approved")) {
                InetAddress ip = InetAddress.getLocalHost();
                //ip.toString().substring(ip.toString().lastIndexOf("/") + 1)
                if(Desc.contains("'")){
                    Desc = Desc.replace("'", "''");
                }
                jdbcTemplate.update("INSERT INTO PAYMENT_LOG (USERNAME, DESCRIPTION, TOTAL, STATUS, IMAGE) VALUES ('" + CurrentUser + "', '" + Desc + "', " + price + ", 'SUCCESS', '" + image + "')");
                return "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\" />\n" +
                        "    <title>Paypal</title>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "<h1>Payment Success</h1>\n" +
                        "<p>Click to go back to Cart: <a href=\"http://localhost:3000/paymentSuccess\">Back</a></p>\n" +
                        "</body>\n" +
                        "</html>";
            }
        } catch (PayPalRESTException | UnknownHostException e) {
            System.out.println(e.getMessage());
        }
        return "redirect:/";
    }

}
