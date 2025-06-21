package com.example.drivingschoolbackend.dtos;

import com.example.drivingschoolbackend.models.Student;

public class ExamDto {

    private Long id;

    private String date;

    private Long result;

    private String name;

    private Long student;

    public ExamDto() {}

    public ExamDto(Long id, String date, Long result, String name, Student student) {
        this.id = id;
        this.date = date;
        this.result = result;
        this.name = name;
        this.student = student.getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getResult() {
        return result;
    }

    public void setResult(Long result) {
        this.result = result;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getStudent() {
        return student;
    }

    public void setStudent(Long student) {
        this.student = student;
    }
}
