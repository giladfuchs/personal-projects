package com.matan.coin;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.matan.login_and_signup.Loading;
import com.matan.objects.Advertisement;

public class Filter extends AppCompatActivity {
    private Thread thread;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);

      ;

        filter();
        thread = new Thread(){
            @Override
            public void run() {
                super.run();
                try {
                    Thread.sleep(2000);
                }
                catch (Exception e){

                }finally {
                    Intent intent=new Intent(Filter.this,Board.class);
                    startActivity(intent);
                    finish();
                }
            }
        };
        thread.start();
    }
    private  void  filter(){
        for(int i=0;i<Loading.advertisements.size();i++){
            if( !Loading.advertisements.get(i) .getLocation().equals(Board.filter_location)  ||
                    ! Loading.advertisements.get(i).getSource_Coin().equals(Board.filter_coinSrc) ||
            ! Loading.advertisements.get(i).getDestination_Coin().equals(Board.filter_coinDst)){
                Loading.advertisements.remove(i);
                i--;
        }}
    }
}
