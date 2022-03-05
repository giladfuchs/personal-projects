package com.matan.login_and_signup;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.matan.coin.Board;
import com.matan.coin.R;
import com.matan.objects.Advertisement;
import com.matan.private_zone.LoadingPrivateZone;

import java.util.ArrayList;

import io.reactivex.annotations.NonNull;

public class Loading extends AppCompatActivity {

    public static ArrayList<Advertisement> advertisements = new ArrayList<Advertisement>();
    public static ArrayList<String> user_advertisements = new ArrayList<String>();
    private FirebaseDatabase mDatabase;
    private DatabaseReference dbRef;
    private Thread thread;
    private static  final String TAG="Post";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);

        //prevent duplicates
        advertisements.clear();
            read();
        thread = new Thread(){
            @Override
            public void run() {
                super.run();
                try {
                    Thread.sleep(1500);
                }
                catch (Exception e){

                }finally {
                    Intent intent=new Intent(Loading.this,Board.class);
                    startActivity(intent);
                    finish();
                }
            }
        };
        thread.start();

    }
    private  void read(){

        mDatabase = FirebaseDatabase.getInstance();
        dbRef = mDatabase.getReference("/advertisements");
        dbRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                for (DataSnapshot datas : snapshot.getChildren()) {
                    Advertisement b=datas.getValue(Advertisement.class);
                    advertisements.add(b);
                }


            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
               Log.w(TAG,"loadPost:onCancelled",databaseError.toException());
               Toast.makeText(Loading.this,"Failed to load post",Toast.LENGTH_SHORT).show();
            }

        });


    }

}
