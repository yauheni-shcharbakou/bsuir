package com.example.drivingschoolbackend.models;

import com.example.drivingschoolbackend.dtos.ExamDto;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "exams")
public class Exam implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "date", nullable = false)
    private String date;

    @Column(name = "result", nullable = false)
    private Long result;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Student student;

    public Exam() {}

    public Exam(String date, Long result, String name, Student student) {
        this.date = date;
        this.result = result;
        this.name = name;
        this.student = student;
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

    public void setStudent(Student student) {
        this.student = student;
    }

    public Student getStudent() {
        return student;
    }

    public ExamDto toDto() {
        return new ExamDto(id, date.toString(), result, name, student);
    }
}
