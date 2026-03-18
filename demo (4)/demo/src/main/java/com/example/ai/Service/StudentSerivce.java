package com.example.ai.Service;

import com.example.ai.Ai.PythonAIService;
import com.example.ai.Entity.Attendance;
import com.example.ai.Entity.Classes;
import com.example.ai.Entity.User;
import com.example.ai.Repo.AttendanceRepo;
import com.example.ai.Repo.ClassesRepo;
import com.example.ai.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudentSerivce {

    private final UserRepo userRepo;
    private final PythonAIService pythonAIService;
    private final AttendanceRepo attendanceRepo;
    private final ClassesRepo classesRepo;


    public Map<String, Object> registerFace(String rollno, MultipartFile photo) {

        if (rollno == null || rollno.isBlank()) {
            throw new IllegalArgumentException("Invalid roll number");
        }

        if (photo == null || photo.isEmpty()) {
            throw new IllegalArgumentException("Photo required");
        }

        User student = userRepo.findByRollno(rollno)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return pythonAIService.registerFaceSafe(student.getRollno(), photo);
    }



    public Attendance verifyFaceAndMarkAttendance(
            String rollno,
            MultipartFile photo,
            Long classId
    ) {

        if (rollno == null || rollno.isBlank()) {
            throw new IllegalArgumentException("Invalid user");
        }

        if (photo == null || photo.isEmpty()) {
            throw new IllegalArgumentException("Photo required");
        }

        if (classId == null) {
            throw new IllegalArgumentException("Class ID missing");
        }

        User student = userRepo.findByRollno(rollno)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Classes classes = classesRepo.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        boolean alreadyMarked =
                attendanceRepo.existsByStudentAndClasses(student, classes);

        if (alreadyMarked) {
            throw new IllegalStateException("Attendance already marked");
        }

        Map<String, Object> aiResult;

        try {

            aiResult = pythonAIService.verifyFaceSafe(
                    student.getRollno(),
                    photo
            );

        } catch (Exception e) {

            throw new RuntimeException("Face verification service unavailable");
        }

        Boolean match = (Boolean) aiResult.get("match");
        Double distance = ((Number) aiResult.get("distance")).doubleValue();

        if (match == null || !match) {
            throw new RuntimeException("Face not matched");
        }

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setClasses(classes);
        attendance.setFaceMatched(true);
        attendance.setFaceDistance(distance);
        attendance.setMarkedAt(LocalDateTime.now());

        return attendanceRepo.save(attendance);
    }



    public List<Classes> findAll() {
        return classesRepo.findAll();
    }

    public Classes findById(Long id) {
        return classesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));
    }

    public List<Classes> byname(String name){
        return classesRepo.findByName(name);
    }
}