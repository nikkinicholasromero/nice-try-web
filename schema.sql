DROP DATABASE NICE_TRY;

USE NICE_TRY;

CREATE TABLE USER_INFORMATION (
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	USERNAME VARCHAR(255) NOT NULL,
	PASSWORD VARCHAR(255) NOT NULL,
	OTP VARCHAR(6),
	PRIMARY KEY (ID)
);
