package com.matan.objects;

public class User {

    private final String Email;
    private int Rank;
    private String FirstName ,LastName, Password ,Phone ;

    /*
    Constructors
     */
    public User(String phone, String firstName, String lastName, String password, String email) {
        Phone = phone;
        FirstName = firstName;
        LastName = lastName;
        Password = password;
        Email = email;
    }
    public User() {
        Phone = "55";
        FirstName = "Anonymus";
        LastName = "View";
        Password = "1234";
        Email = "aa@gmail.com";
    }

    /*
    Getters / Setters
     */
    public String getPhone() { return Phone; }
    public void setPhone(String phone) {
        Phone = phone;
    }
    public int getRank() {
        return Rank;
    }
    public void setRank(int rank) {
        Rank = rank;
    }
    public String getFirstName() {
        return FirstName;
    }
    public void setFirstName(String firstName) {
        FirstName = firstName;
    }
    public String getLastName() {
        return LastName;
    }
    public void setLastName(String lastName) {
        LastName = lastName;
    }
    public String getPassword() {
        return Password;
    }
    public void setPassword(String password) {
        Password = password;
    }
    public String getEmail() {
        return Email;
    }

}
