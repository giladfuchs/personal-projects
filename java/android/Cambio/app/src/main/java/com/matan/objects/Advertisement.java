package com.matan.objects;

import com.matan.data_holder.UserHold;

public class Advertisement {


    private  String Source_Coin ,Destination_Coin,Location ,Amount ,phone, email ,date,user_key,adv_key;

    /*
   Constructors
    */
    public Advertisement(String key_adv, String email, String phone, String source_Coin, String destination_Coin, String location, String amount) {
        date=Current_Time.GetTime();
        this.email = email;
        this.phone = phone;
        Source_Coin = source_Coin;
        Destination_Coin = destination_Coin;
        Location = location;
        Amount = amount;
        user_key=UserHold.getKey_User();
        adv_key = key_adv;
    }

    public Advertisement() {
        adv_key ="kjk";
        user_key=UserHold.getKey_User();
        date=Current_Time.GetTime();
        this.email = "a";
        Source_Coin = "a";
        Destination_Coin = "a";
        Location = "a";
        Amount = "1";

    }
    public String toString(){
        return  user_key;
    }
    /*
    Getters / Setters
     */
    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone){
        this.phone=phone;
    }
    public String getUser_key() {
        return user_key;
    }
    public String getAdv_key() {
        return adv_key;
    }
    public String getSource_Coin() {
        return Source_Coin;
    }
    public void setSource_Coin(String source_Coin) {
        Source_Coin = source_Coin;
    }
    public String getDestination_Coin() {
        return Destination_Coin;
    }
    public void setDestination_Coin(String destination_Coin) {
        Destination_Coin = destination_Coin;
    }
    public String getLocation() {
        return Location;
    }
    public void setLocation(String location) {
        Location = location;
    }
    public String getAmount() {
        return Amount;
    }
    public void setAmount(String amount) {
        Amount = amount;
    }
    public String getDate() {
        return date;
    }

}
