package com.matan.Chat;

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
import com.matan.coin.AdvertisementProperties;
import com.matan.coin.Board;
import com.matan.coin.R;
import com.matan.data_holder.UserHold;
import com.matan.login_and_signup.Loading;
import com.matan.objects.Advertisement;
import com.matan.private_zone.LoadingPrivateZone;

import java.util.ArrayList;

import io.reactivex.annotations.NonNull;

public class LoadingChat extends AppCompatActivity {
    public  static  String Key_chat;
    private Thread thread;
    private FirebaseDatabase mDatabase;
    private DatabaseReference dbRef;
    public static ArrayList<String> messagelist=new ArrayList<String>();
    private static  final String TAG="Chat";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);



        create_chat();
        thread = new Thread(){
            @Override
            public void run() {
                super.run();
                try {
                    Thread.sleep(500);
                }
                catch (Exception e){

                }finally {
                    Intent intent = new Intent(LoadingChat.this, MainChat.class);
                    startActivity(intent);
                    finish();
                }
            }
        };
        thread.start();

    }
    private  void create_chat(){


        mDatabase = FirebaseDatabase.getInstance();
        dbRef = mDatabase.getReference("/user");
        dbRef.child("/" + UserHold.getKey_User() + "/conversation/" + MainChat.send).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {

                /**
                 * checking if exsist conversation for those users
                 * if not it's create one
                 */
                if (snapshot.exists()) {
                    Key_chat = snapshot.getValue().toString();
                    messagelist.clear();
                    read_message();

                } else {
                    FirebaseDatabase mDatabase = FirebaseDatabase.getInstance();
                    DatabaseReference ref = mDatabase.getReference("/user");
                    Key_chat = ref.push().getKey();


                    ref.child("/" + UserHold.getKey_User() + "/conversation/" +MainChat. send).setValue(Key_chat);
                    ref.child("/" + MainChat.send + "/conversation/" + UserHold.getKey_User()).setValue(Key_chat);



                }



            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Log.w(TAG,"loadChat:onCancelled",databaseError.toException());
                Toast.makeText(LoadingChat.this,"Failed to load chat",Toast.LENGTH_SHORT).show();
            }

        });


    }
    private  void read_message(){

        DatabaseReference dbRef_adv= mDatabase.getReference("/chat/"+Key_chat);
        dbRef_adv.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                String year ,month,day_time,user,msg;
                for (DataSnapshot datas : snapshot.getChildren()) {
                    year =datas.getKey().toString();
                    for (DataSnapshot datas2 : datas.getChildren()) {
                        month =datas2.getKey().toString();
                        messagelist.add(month +" / "+year);
                        for (DataSnapshot datas3 : datas2.getChildren()) {
                            day_time =datas3.getKey().toString();
                            for (DataSnapshot datas4 : datas3.getChildren()) {
                                msg = datas4.getValue().toString();
                                user=(datas4.getKey().toString().equals(UserHold.getKey_User()) ? "me" :"other");
                                messagelist.add(day_time + "  :  " + user+" : "+"\n"+msg);
                            }
                        }
                    }

                }


            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
            }

        });



    }
}


