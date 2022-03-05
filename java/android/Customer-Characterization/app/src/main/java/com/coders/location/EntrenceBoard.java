package com.coders.location;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.Spinner;

import io.paperdb.Paper;

public class EntrenceBoard extends AppCompatActivity {
    public static String path="Pharms";
    ImageView image;

     static CheckBox  remember_me;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate( savedInstanceState );
        setContentView( R.layout.activity_entrence_board );
        image = (ImageView) findViewById(R.id.imageView1);
        Spinner option = findViewById(R.id.option);
     remember_me = (CheckBox) findViewById(R.id.remember);

        Paper.init(this);
        if(Paper.book().read(AppConstants.Userprefer)!=null  &&  !Paper.book().read(AppConstants.Userprefer).equals( "no" )) {
            path=Paper.book().read(AppConstants.Userprefer);
            Intent FIlterIntent = new Intent(EntrenceBoard.this, GeneralBoard.class);
            startActivity(FIlterIntent);
            finish();
        }
        //create a list of items for the spinner.
        String[] items = new String[]{"Pharms","Library","Homes"};


        ArrayAdapter<String> adapterSpinnerCities = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items);
        //set the spinners adapter to the previously created one.
        option.setAdapter(adapterSpinnerCities);

        final Button FIlterActivity = (Button)findViewById(R.id.filterBtn);
        FIlterActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                path=option.getSelectedItem().toString();
                if(remember_me.isChecked()){
                    Paper.book().write(AppConstants.Userprefer , path);
                }
                Intent FIlterIntent = new Intent(EntrenceBoard.this, GeneralBoard.class);
                startActivity(FIlterIntent);
                finish();

            }
        });
    }


}
