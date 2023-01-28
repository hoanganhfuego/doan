/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "commentforum")
public class CommentForum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cd;

    public long getCd() {
        return cd;
    }

    public void setCd(long cd) {
        this.cd = cd;
    }

    @Column(name = "cid")
    private long cid;

    public long getCid() {
        return cid;
    }

    public void setCid(long cid) {
        this.cid = cid;
    }

    @Column(name = "ctitle")
    private String ctitle;

    @Column(name = "ccomment")
    private String ccomment;

    @Column(name = "cctime")
    private String cctime;

    @Column(name = "uname")
    private String uname;

    public String getCtitle() {
        return ctitle;
    }

    public void setCtitle(String ctitle) {
        this.ctitle = ctitle;
    }

    public String getCcomment() {
        return ccomment;
    }

    public void setCcomment(String ccomment) {
        this.ccomment = ccomment;
    }

    public String getCctime() {
        return cctime;
    }

    public void setCctime(String cctime) {
        this.cctime = cctime;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public CommentForum(){

    }

    public CommentForum(long cid, String ctitle, String ccomment, String cctime, String uname) {
        this.ctitle = ctitle;
        this.ccomment = ccomment;
        this.cctime = cctime;
        this.uname = uname;
        this.cid = cid;
    }
}
