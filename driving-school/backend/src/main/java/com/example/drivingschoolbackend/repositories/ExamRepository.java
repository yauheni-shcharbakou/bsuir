package com.example.drivingschoolbackend.repositories;

import com.example.drivingschoolbackend.models.Exam;
import com.example.drivingschoolbackend.models.Student;
import org.springframework.data.repository.CrudRepository;

public interface ExamRepository extends CrudRepository<Exam, Long> {
    Iterable<Exam> findAllByStudent(Student student);
}
