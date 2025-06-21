package com.example.drivingschoolbackend.repositories;

import com.example.drivingschoolbackend.models.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {}
