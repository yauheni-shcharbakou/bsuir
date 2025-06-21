package com.example.drivingschoolbackend.services;

import com.example.drivingschoolbackend.dtos.ExamDto;
import com.example.drivingschoolbackend.models.Exam;
import com.example.drivingschoolbackend.models.Student;
import com.example.drivingschoolbackend.repositories.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Date;

@Service
public class ExamService {
    @Autowired
    private ExamRepository repository;

    public Iterable<Exam> getAll() {
        return this.repository.findAll();
    }

    public Iterable<Exam> getByStudent(Student student) {
        return this.repository.findAllByStudent(student);
    }

    public Exam getById(Long id) {
        return this.repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Exam create(ExamDto dto, Student student) {
        Exam exam = new Exam(
            dto.getDate(),
            dto.getResult(),
            dto.getName(),
            student
        );

        this.repository.save(exam);
        return exam;
    }

    public Exam change(Long id, ExamDto dto) {
        Exam exam = this.getById(id);

        exam.setDate(dto.getDate());
        exam.setResult(dto.getResult());
        exam.setName(dto.getName());

        this.repository.save(exam);
        return exam;
    }

    public Long delete(Exam exam) {
        this.repository.delete(exam);
        return exam.getId();
    }
}
