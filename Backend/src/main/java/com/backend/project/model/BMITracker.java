/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "bmitracker")
public class BMITracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "bmi")
    private float bmi;

    @Column(name = "caldate")
    private String caldate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public float getBmi() {
        return bmi;
    }

    public void setBmi(float bmi) {
        this.bmi = bmi;
    }

    public String getCaldate() {
        return caldate;
    }

    public void setCaldate(String caldate) {
        this.caldate = caldate;
    }

    public BMITracker(String username, float bmi, String caldate) {
        this.username = username;
        this.bmi = bmi;
        this.caldate = caldate;
    }

    public BMITracker() {

    }
}
