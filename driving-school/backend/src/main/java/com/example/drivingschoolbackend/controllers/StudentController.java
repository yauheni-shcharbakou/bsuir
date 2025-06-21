package com.example.drivingschoolbackend.controllers;

import com.example.drivingschoolbackend.dtos.ExamDto;
import com.example.drivingschoolbackend.dtos.StudentDto;
import com.example.drivingschoolbackend.models.Exam;
import com.example.drivingschoolbackend.models.Student;
import com.example.drivingschoolbackend.services.ExamService;
import com.example.drivingschoolbackend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ExamService examService;

    @GetMapping
    List<StudentDto> getAll() {
        List<Student> studentList = new ArrayList<>();
        studentService.getAll().forEach(studentList::add);
        return studentList.stream().map(Student::toDto).toList();
    }

    @GetMapping("{id}")
    StudentDto getById(@PathVariable Long id) {
        return studentService.getById(id).toDto();
    }

    @GetMapping("{id}/exams")
    List<ExamDto> getExamsByStudent(@PathVariable Long id) {
        Student student = studentService.getById(id);
        List<Exam> examList = new ArrayList<>();
        examService.getByStudent(student).forEach(examList::add);
        return examList.stream().map(Exam::toDto).toList();
    }

    @PostMapping
    StudentDto create(@RequestBody StudentDto dto) {
        return studentService.create(dto).toDto();
    }

    @PutMapping("{id}")
    StudentDto change(@RequestBody StudentDto dto, @PathVariable Long id) {
        return studentService.change(id, dto).toDto();
    }

    @DeleteMapping("{id}")
    Long delete(@PathVariable Long id) {
        Student student = studentService.getById(id);

        for (Exam exam : student.getExams()) {
            studentService.removeExam(exam);
            examService.delete(exam);
        }

        return studentService.delete(student);
    }
}
