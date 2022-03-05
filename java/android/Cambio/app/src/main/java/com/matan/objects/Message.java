package com.matan.objects;

import java.util.Date;

public class Message {

    private String sender;
    private String receiver;
    private String text;
    private long timestamp;

    public Message(String sender,String receiver, String text){
        this.sender=sender;
        this.receiver=receiver;
        this.text=text;
        this.timestamp = new Date().getTime();
    }
}
