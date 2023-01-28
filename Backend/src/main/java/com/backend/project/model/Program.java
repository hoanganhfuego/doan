/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "program")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "image")
    private String image;

    @Column(name = "text")
    private String text;

    @Column(name = "label")
    private String label;

    @Column(name = "type")
    private String type;

    public Program(String image, String text, String label, String type) {
        this.image = image;
        this.text = text;
        this.label = label;
        this.type = type;
    }

    public Program() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String lable) {
        this.label = lable;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

