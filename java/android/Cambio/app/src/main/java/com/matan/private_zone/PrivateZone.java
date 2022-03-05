package com.matan.private_zone;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.matan.coin.AdvertisementProperties;
import com.matan.coin.Board;
import com.matan.coin.CustomAdapter;
import com.matan.coin.R;
import com.matan.login_and_signup.Loading;
import com.matan.login_and_signup.Login;
import com.matan.login_and_signup.MainActivity;
import com.matan.login_and_signup.Utils;
import com.matan.objects.Advertisement;

import java.util.ArrayList;

import io.paperdb.Paper;

import static java.security.AccessController.getContext;

public class PrivateZone extends AppCompatActivity {

    private static Button logoutButton;
    private static Button addAdvertisement;
    private static Button deleteAdvertisement;
    private static Button modifyAdvertisement;
    ArrayList<Advertisement> dataModels;
    public  ListView listView;
    public  CustomAdapter adapter;
     public  static Advertisement mod_adv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_private_zone);

        initButtons();
/*
       Button to go to Add advertisement
        */
        final Button privateZoneActivity = (Button)findViewById(R.id.addAdvertisementBtn);
        privateZoneActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent privateZoneIntent = new Intent (PrivateZone.this,AddAdvertisement.class);
                startActivity(privateZoneIntent);
            }
        });


        // Get ListView object from xml
        listView = (ListView) findViewById(R.id.list);


        adapter= new CustomAdapter(LoadingPrivateZone.user_advertisements,getApplicationContext());


        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                mod_adv= LoadingPrivateZone.user_advertisements.get(position);



                // ListView Clicked item index  @position

                //MainChat.send=MainActivity.a.get(itemPosition);
                AdvertisementProperties.advertisement = LoadingPrivateZone.user_advertisements.get(position);
                AdvertisementProperties.advertisementPosition = position;
                Intent intent = new Intent (PrivateZone.this, ModifyAdvertisement.class);
                startActivity(intent);
            }
        });


        // when user log out
        logOut();
    }
    private void initButtons(){
        logoutButton = (Button) findViewById(R.id.logoutBtn);
        addAdvertisement = (Button) findViewById(R.id.addAdvertisementBtn);
        //deleteAdvertisement = (Button) findViewById(R.id.deleteAdvertisementBtn);
        //modifyAdvertisement = (Button) findViewById(R.id.modifyAdvertisementBtn);
    }
    private void logOut(){

        logoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FirebaseAuth mAuth = FirebaseAuth.getInstance();
                Paper.book().destroy();
                mAuth.signOut();
                Intent intent = new Intent (PrivateZone.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }

    public static    void refresh(){


    }

    @Override
    public void onBackPressed(){
        if(Utils.flag){
            Intent i = new Intent(PrivateZone.this, Loading.class);
            startActivity(i);
            finish();
        }
        else
            super.onBackPressed();
    }
}
