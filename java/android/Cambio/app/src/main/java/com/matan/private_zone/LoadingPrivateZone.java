package com.matan.private_zone;

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
import com.matan.data_holder.UserHold;
import com.matan.login_and_signup.Loading;
import com.matan.objects.Advertisement;

import java.util.ArrayList;

import io.reactivex.annotations.NonNull;

public class LoadingPrivateZone extends AppCompatActivity {

    public static ArrayList<Advertisement> user_advertisements = new ArrayList<Advertisement>();
    private FirebaseDatabase mDatabase;
    private DatabaseReference dbRef;
    private Thread thread;
    private static  final String TAG="Post";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);

        //prevent duplicates
        user_advertisements.clear();
        read();
        thread = new Thread(){
            @Override
            public void run() {
                super.run();
                try {
                    Thread.sleep(1500);
                    if(user_advertisements.size()==0)
                        Thread.sleep(500);
                }
                catch (Exception e){

                }finally {

                    Intent intent=new Intent(LoadingPrivateZone.this,PrivateZone.class);
                    startActivity(intent);
                    finish();
                }
            }
        };
        thread.start();

    }
    private  void read(){
        Toast.makeText(getApplicationContext(),
                "loading" , Toast.LENGTH_LONG)
                .show();
        mDatabase = FirebaseDatabase.getInstance();
        dbRef = mDatabase.getReference("/advertisements");
        dbRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                for (DataSnapshot datas : snapshot.getChildren()) {
                    Advertisement ad=datas.getValue(Advertisement.class);
                    /* add to see is own adv in private zone*/
                    if(  ad.getUser_key().equals(UserHold.getKey_User()))
                        user_advertisements.add(ad);

                }


            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Log.w(TAG,"loadPost:onCancelled",databaseError.toException());
                Toast.makeText(LoadingPrivateZone.this,"Failed to load post",Toast.LENGTH_SHORT).show();
            }

        });


    }
}
