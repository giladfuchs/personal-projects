package com.matan.coin;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import com.matan.coin.R;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserInfo;
import com.matan.Chat.LoadingChat;
import com.matan.Chat.MainChat;
import com.matan.data_holder.UserHold;
import com.matan.login_and_signup.Loading;
import com.matan.objects.Advertisement;

import java.util.ArrayList;

public class AdvertisementProperties extends AppCompatActivity {

    public static int advertisementPosition;
    //public static String advertisementId;
    public static Advertisement advertisement;
    private static TextView email,sourceCoin,destCoin,date,location,amount;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_advertisement_properties);


        email = findViewById(R.id.email);
        email.setText(advertisement.getEmail());

        sourceCoin = findViewById(R.id.sourceCoin);
        sourceCoin.setText(advertisement.getSource_Coin());

        destCoin = findViewById(R.id.destCoin);
        destCoin.setText(advertisement.getDestination_Coin());

        date = findViewById(R.id.date);
        date.setText(advertisement.getDate());

        location = findViewById(R.id.location);
        location.setText(advertisement.getLocation());

        amount = findViewById(R.id.amount);
        amount.setText(advertisement.getAmount());

        //Button to MainChat
        final Button chatActivity = (Button) findViewById(R.id.chat);
        chatActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //email is the 4th property of advertisement in firebase
                MainChat.send = Loading.advertisements.get(advertisementPosition).getUser_key();

                if(  UserHold.getKey_User().equals(MainChat.send)) {
                    Toast.makeText(getApplicationContext(),
                            "This your advereisement" , Toast.LENGTH_LONG)
                            .show();
                }
                else if( UserHold.getKey_User().equals("guest"))
                    Toast.makeText(getApplicationContext(),
                            "guest" , Toast.LENGTH_LONG)
                            .show();
                else{
                    Intent intent = new Intent(AdvertisementProperties.this, LoadingChat.class);
                    startActivity(intent);
                }
            }
        });

    }
}
