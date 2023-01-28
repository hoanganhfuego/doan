/**
 * Written by minhhq
 */

package com.backend.project;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.backend.project.model.Products;
import com.backend.project.repository.ProductRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

public class TestWebApp extends ProjectApplicationTests {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetComment() throws Exception {
        mockMvc.perform(get("/api/comment/")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetCommentEachForum() throws Exception {
        mockMvc.perform(get("/api/comment/148")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetForum() throws Exception {
        mockMvc.perform(get("/api/forum/")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetForumDetail() throws Exception {
        mockMvc.perform(get("/api/forum/148")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetForumViaSearch() throws Exception {
        mockMvc.perform(get("/api/forum/search/20")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetRedirectLinkPaypal() throws Exception {
        mockMvc.perform(get("/link/")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetPaymentCancelHistory() throws Exception {
        mockMvc.perform(get("/api/order/minhhq/cancel")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetPaymentSuccessHistory() throws Exception {
        mockMvc.perform(get("/api/order/minhhq/success")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProducts() throws Exception {
        mockMvc.perform(get("/api/products/")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProductsById() throws Exception {
        mockMvc.perform(get("/api/products/67")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProductsByCategoryApparel() throws Exception {
        mockMvc.perform(get("/api/products/category/apparel")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProductsByCategorySupplement() throws Exception {
        mockMvc.perform(get("/api/products/category/supplement")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProductsByCategoryAccessories() throws Exception {
        mockMvc.perform(get("/api/products/category/accessories")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProgramSuggestViaBMICalculator() throws Exception {
        mockMvc.perform(get("/api/bmi/Chest")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetBMITrackerData() throws Exception {
        mockMvc.perform(get("/api/chart/minhhq")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProgramList() throws Exception {
        mockMvc.perform(get("/api/list/Chest")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProgramTarget() throws Exception {
        mockMvc.perform(get("/api/program/muscle")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProgramMuscle() throws Exception {
        mockMvc.perform(get("/api/program/target")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetVideoExercise() throws Exception {
        mockMvc.perform(get("/api/video/Pec%20deck")).andExpect(status().isOk()).andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(status().isOk());
    }
}


