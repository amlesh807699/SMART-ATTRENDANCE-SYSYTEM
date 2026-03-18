package com.example.ai.Service;

import com.example.ai.Entity.Attendance;
import com.example.ai.Entity.Classes;
import com.example.ai.Entity.Role;
import com.example.ai.Entity.User;
import com.example.ai.Repo.AttendanceRepo;
import com.example.ai.Repo.ClassesRepo;
import com.example.ai.Repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherService {

    private final UserRepo userRepo;
    private final AttendanceRepo attendanceRepo;
    private final ClassesRepo classesRepo;


    public Classes createClass(String rollno, Classes classes) {
        if (rollno == null || rollno.isBlank()) {
            throw new IllegalArgumentException("Teacher roll number is required");
        }

        if (classes == null) {
            throw new IllegalArgumentException("Class data cannot be null");
        }

        User teacher = userRepo.findByRollno(rollno)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (teacher.getRole() != Role.TEACHER) {
            throw new RuntimeException("Only teachers can create classes");
        }


        classes.setId(null);
        classes.setTeacher(teacher);

        return classesRepo.save(classes);
    }


    public Classes findById(Long id) {

        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid class ID");
        }

        return classesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));
    }


    public void deleteClass(Long id) {

        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid class ID");
        }

        if (!classesRepo.existsById(id)) {
            throw new RuntimeException("Class does not exist");
        }

        classesRepo.deleteById(id);
    }


    public List<Classes> getClass(String rollno) {

        if (rollno == null || rollno.isBlank()) {
            throw new IllegalArgumentException("Roll number required");
        }

        if (!userRepo.existsByRollno(rollno)) {
            throw new RuntimeException("Teacher not found");
        }

        return classesRepo.findByTeacher_Rollno(rollno);
    }


    public List<User> getStudentsWhoJoinedClass(Long id) {

        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid class ID");
        }

        Classes classes = classesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        List<Attendance> attendanceList =
                attendanceRepo.findByClasses(classes);

        return attendanceList.stream()
                .map(Attendance::getStudent)
                .filter(student -> student != null)
                .distinct()
                .toList();
    }


}
