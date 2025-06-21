package com.example.drivingschoolbackend.services;

import com.example.drivingschoolbackend.dtos.StudentDto;
import com.example.drivingschoolbackend.models.Exam;
import com.example.drivingschoolbackend.models.Student;
import com.example.drivingschoolbackend.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Set;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;

    public Iterable<Student> getAll() {
        return this.repository.findAll();
    }

    public Student getById(Long id) {
        return this.repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Student create(StudentDto dto) {
        Student student = new Student(
            dto.getPassport(),
            dto.getFirstName(),
            dto.getLastName(),
            dto.getAddress()
        );

        this.repository.save(student);
        return student;
    }

    public Student change(Long id, StudentDto dto) {
        Student student = this.getById(id);

        student.setAddress(dto.getAddress());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setPassport(dto.getPassport());

        this.repository.save(student);
        return student;
    }

    public void addExam(Exam exam) {
        Student student = exam.getStudent();
        Set<Exam> exams = student.getExams();
        exams.add(exam);
        student.setExams(exams);
        this.repository.save(student);
    }

    public void removeExam(Exam exam) {
        Student student = exam.getStudent();
        Set<Exam> exams = student.getExams();
        exams.remove(exam);
        student.setExams(exams);
        this.repository.save(student);
    }

    public Long delete(Student student) {
        this.repository.delete(student);
        return student.getId();
    }
}
