/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "forum")
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postid;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "ctime")
    private String ctime;

    @Column(name = "ititle")
    private String ititle;

    @Column(name = "video")
    private String video;

    @Column(name = "content")
    private String content;

    public String getCtime() {
        return ctime;
    }

    public void setCtime(String ctime) {
        this.ctime = ctime;
    }

    public long getPostid() {
        return postid;
    }

    public void setPostid(long postid) {
        this.postid = postid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getItitle() {
        return ititle;
    }

    public void setItitle(String ititle) {
        this.ititle = ititle;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Forum() {

    }

    public Forum(String title, String description, String image, String ititle, String video, String content, String ctime) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.ititle = ititle;
        this.video = video;
        this.content = content;
        this.ctime = ctime;
    }
}
