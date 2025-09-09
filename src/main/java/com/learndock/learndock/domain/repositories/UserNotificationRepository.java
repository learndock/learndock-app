package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.notifications.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findAllByUser(User user);

    List<UserNotification> findAllByUserAndSeenFalse(User user);
}
