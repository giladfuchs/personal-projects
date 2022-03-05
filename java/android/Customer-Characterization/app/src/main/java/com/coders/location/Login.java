package com.coders.location;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Calendar;

import io.paperdb.Paper;

public class Login extends AppCompatActivity {
    private FirebaseDatabase mDatabase = FirebaseDatabase.getInstance();
    private DatabaseReference dbRef = mDatabase.getReference("users");
    private  EditText phone;
    private static Button sendbutton;
    private   String userPhone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate( savedInstanceState );
        setContentView( R.layout.activity_login );
        phone = (EditText) findViewById(R.id.editText);



        sendbutton = (Button) findViewById(R.id.button);
        sendbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String num = phone.getText().toString();

                if(num.length()==10 && num.charAt(0)== '0' && num.charAt(1) == '5'){
                    dbRef.child("/"+num).setValue(""+Calendar.getInstance().getTime());

                    Paper.book().write(AppConstants.user_Phone , num);
                    Intent i = new Intent(Login.this, EntrenceBoard.class);
                    startActivity(i);
                    finish();


                }
                else
                    Toast.makeText(Login.this,"שגיאה במספר טלפון",Toast.LENGTH_SHORT).show();
            }


        });

    }
}
