package com.example.drivingschoolbackend.dtos;

public class StudentDto {

    private Long id;

    private String passport;

    private String firstName;

    private String lastName;

    private String address;

    public StudentDto() {}

    public StudentDto(Long id, String passport, String firstName, String lastName, String address) {
        this.id = id;
        this.passport = passport;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
