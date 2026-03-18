package com.example.ai.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "attendance",
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "class_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    @NotNull(message = "Student is required")
    private User student;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_id", nullable = false)
    @NotNull(message = "Class is required")
    private Classes classes;


    @Column(nullable = false)
    private boolean faceMatched = false;

    private Double faceDistance;


    @Column(nullable = false)
    private LocalDateTime markedAt;


    @PrePersist
    public void prePersist() {
        if (markedAt == null) {
            markedAt = LocalDateTime.now();
        }
    }
}
