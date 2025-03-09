CREATE DATABASE IF NOT EXISTS ma_reservation;
USE ma_reservation;
CREATE TABLE IF NOT EXISTS reservationdb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(250) NOT NULL,
    lastName VARCHAR(250) NOT NULL,
    phoneNumber INT NOT NULL,
    destination VARCHAR(250) NOT NULL,
    cooperative VARCHAR(250) NOT NULL
);