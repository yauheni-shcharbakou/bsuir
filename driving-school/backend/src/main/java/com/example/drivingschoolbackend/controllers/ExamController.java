package com.example.drivingschoolbackend.controllers;

import com.example.drivingschoolbackend.dtos.ExamDto;
import com.example.drivingschoolbackend.models.Exam;
import com.example.drivingschoolbackend.models.Student;
import com.example.drivingschoolbackend.services.ExamService;
import com.example.drivingschoolbackend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("exams")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ExamService examService;

    @GetMapping
    List<ExamDto> getAll() {
        List<Exam> examList = new ArrayList<>();
        examService.getAll().forEach(examList::add);
        return examList.stream().map(Exam::toDto).toList();
    }

    @PostMapping
    ExamDto create(@RequestBody ExamDto dto) {
        Student student = studentService.getById(dto.getStudent());
        Exam exam = examService.create(dto, student);
        studentService.addExam(exam);
        return exam.toDto();
    }

    @PutMapping("{id}")
    ExamDto change(@RequestBody ExamDto dto, @PathVariable Long id) {
        return examService.change(id, dto).toDto();
    }

    @DeleteMapping("{id}")
    Long delete(@PathVariable Long id) {
        Exam exam = examService.getById(id);
        studentService.removeExam(exam);
        return examService.delete(exam);
    }
}
