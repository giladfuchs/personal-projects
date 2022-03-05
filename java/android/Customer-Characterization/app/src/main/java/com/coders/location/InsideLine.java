package com.coders.location;

import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;
import android.widget.TextView;
import android.widget.Toast;

import com.coders.location.Object.Metadata;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Calendar;

import io.paperdb.Paper;

public class InsideLine extends Activity {
    private Button mStartButton;
    private Button mPauseButton;
    private Button mResetButton;
    private Chronometer mChronometer;
    private  boolean enter=false;
    private long lastPause;
   private long begin,end;
    String phone="0555431234";
    private  FirebaseDatabase mDatabase = FirebaseDatabase.getInstance();
   private DatabaseReference dbRefa= mDatabase.getReference("/"+EntrenceBoard.path+"/");

   private static TextView name;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inside_line);
        mStartButton = (Button) findViewById(R.id.start_button);
        mPauseButton = (Button) findViewById(R.id.pause_button);
        mResetButton = (Button) findViewById(R.id.reset_button);
        mChronometer = (Chronometer) findViewById(R.id.chronometer);
        name = findViewById(R.id.nameplace);
        name.setText("הינך מחכה ב :"+Metadata.current_obj);
        phone=Paper.book().read(AppConstants.user_Phone);
        mStartButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (lastPause != 0){
                    mChronometer.setBase(mChronometer.getBase() + SystemClock.elapsedRealtime() - lastPause);
                }
                else{
                    mChronometer.setBase(SystemClock.elapsedRealtime());
                }
                enter=true;
                String time=""+Calendar.getInstance().getTime();
                time=time.substring(0,13 );
                begin = System.currentTimeMillis();
                dbRefa.child(Metadata.current_obj).child("/wait/"+phone).setValue(time);
                mChronometer.start();
                mStartButton.setEnabled(false);
                mPauseButton.setEnabled(true);
            }
        });

        mPauseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                if(enter) {
                    end = System.currentTimeMillis();
                    long dt = end - begin;
                    dbRefa.child( Metadata.current_obj ).child( "/visit/" + Calendar.getInstance().getTime() ).setValue( (dt / 1000) );
                    dbRefa.child( Metadata.current_obj ).child( "/wait/" + phone ).removeValue();
                    mChronometer.stop();
                    mPauseButton.setEnabled( false );
                    mStartButton.setEnabled( true );
                    Intent i = new Intent( InsideLine.this, GeneralBoard.class );
                    startActivity( i );
                    finish();
                }
                else
                    Toast.makeText(InsideLine.this,"השתמש בכפתור היציאה הרגיל בבקשה" +
                            "הינך לא בתור",Toast.LENGTH_SHORT).show();
            }
        });

        mResetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mChronometer.stop();
                mChronometer.setBase(SystemClock.elapsedRealtime());
                lastPause = 0;
                mStartButton.setEnabled(true);
                mPauseButton.setEnabled(false);
                dbRefa.child( Metadata.current_obj).child("/wait/"+phone).removeValue();
                Intent i= new Intent(InsideLine.this,GeneralBoard.class);
                startActivity(i);
                finish();
            }
        });
    }
    @Override
    public void onBackPressed(){
        Toast.makeText(InsideLine.this,"השתמש בכפתורי היציאה בבקשה",Toast.LENGTH_SHORT).show();
    }
}