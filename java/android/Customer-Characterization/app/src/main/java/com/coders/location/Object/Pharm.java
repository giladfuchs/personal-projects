package com.coders.location.Object;


import java.util.HashMap;
import java.util.Map;

public class Pharm {

    private   double lat,lon;
    private String name;
    private int numOfPeople;
    // private List<Map<String, String>> visit;
    private Map<String,Integer>   visit ;
    private Map<String,String>   wait ;
    public  Pharm(){
        name="aaa";
        wait=new HashMap<String, String>();
        numOfPeople=2;
        lat = 31.89259 ;
        lon = 35.00910;
        visit=new HashMap<String, Integer>();
        visit.put("aa",55);

    }
    public Map<String,Integer>  getVisit(){return visit;}
    public void setVisit(Map<String,Integer>    v) {
        visit = v;
    }
    public int getnumOfPeople() {
        return numOfPeople;
    }
    public void setnumOfPeople(int rank) {
        numOfPeople = rank;
    }
    public String getName() { return name; }
    public void setName(String phone) {
        name = phone;
    }
    public Map<String,String> getWait() { return wait; }
    public void setWait(Map<String,String>  phone) {
        wait = phone;
    }
    public double getLat(){
        if(lat == 0){
            lat = 32.1031880;
        }
        return  lat;
    }
    public void setLat(double lat){
        this.lat = lat;
    }
    public double getLon(){
        if(lon == 0){
            lon = 35.2099067;
        }
        return  lon;
    }
    public void setLon(double lon){
        this.lon = lon;
    }
}
