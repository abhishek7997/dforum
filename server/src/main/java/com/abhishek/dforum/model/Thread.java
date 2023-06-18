package com.abhishek.dforum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="threads")
public class Thread {
    @Id
    @Column(name = "thread_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long threadId;

    @Column(name="title", nullable = false)
    private String title;

    @Lob
    @Column(name="content", nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(name="created_at", insertable=false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;
}
