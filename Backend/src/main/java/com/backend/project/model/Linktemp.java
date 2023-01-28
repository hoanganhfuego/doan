/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "linktemp")
public class Linktemp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tid;

    @Column(name = "link")
    private String link;

    public long getTid() {
        return tid;
    }

    public void setTid(long tid) {
        this.tid = tid;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Linktemp(String link) {
        this.link = link;
    }

    public Linktemp() {

    }
}
