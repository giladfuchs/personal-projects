package com.matan.data_holder;

import com.matan.objects.User;

public class UserHold {
    //static User user=null;
    static String Key_User="";
    static String Phone="00";

    public static void setUser_hold(String key ){

        Key_User=key;
    }

    public static String getKey_User() {
        return Key_User;
    }

    public static void setPhone(String phone ){

        Phone=phone;
    }

    public static String getPhone() {
        return Phone;
    }
}
