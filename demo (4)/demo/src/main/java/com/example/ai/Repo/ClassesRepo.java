package com.example.ai.Repo;

import com.example.ai.Entity.Classes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassesRepo extends JpaRepository<Classes, Long> {

    List<Classes> findByTeacher_Rollno(String rollno);
    List<Classes> findByName(String name);
}
