package com.coders.location;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Calendar;
import java.util.Locale;

import io.paperdb.Paper;

public class MainActivity extends AppCompatActivity {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Paper.init(this);
        if(Paper.book().read(AppConstants.user_Phone)!=null) {
            String userPhone = Paper.book().read( AppConstants.user_Phone );
            if (!userPhone.equals( "" ) && !TextUtils.isEmpty( userPhone ))
                LogIn();
        }else{
            Intent i = new Intent(MainActivity.this, Login.class);
            startActivity(i);
            finish();
        }
    }
    private void LogIn() {
        Intent i = new Intent(MainActivity.this, EntrenceBoard.class);
        startActivity(i);
        finish();
    }




    }





