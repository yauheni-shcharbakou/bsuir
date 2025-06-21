package com.example.notes.views.models;

public class Note {
    private int id;
    private String text;

    public Note(int id, String text) {
        this.id = id;
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public int getId() {
        return id;
    }
}
