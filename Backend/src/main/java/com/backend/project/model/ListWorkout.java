/**
 * Written by minhhq
 */

package com.backend.project.model;

import javax.persistence.*;

@Entity
@Table(name = "listworkout")
public class ListWorkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "video")
    private String video;

    @Column(name = "label")
    private String label;

    public ListWorkout(String name, String video, String label) {
        this.name = name;
        this.video = video;
        this.label = label;
    }

    public ListWorkout () {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
