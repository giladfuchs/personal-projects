package com.coders.location;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.coders.location.Object.GpsUtils;
import com.coders.location.Object.Metadata;
import com.coders.location.Object.Pharm;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;
import java.util.Set;

import io.paperdb.Paper;

public class GeneralBoard extends AppCompatActivity {
    private ArrayList<Pharm> list_pharm=new ArrayList<Pharm>();
    private ValueEventListener mDatabasePharmsListener;
    DatabaseReference mDatabasePharms = FirebaseDatabase.getInstance().getReference(EntrenceBoard.path);
    private ListView listView;
    private static TextView name;
    private static row_item adapter;
    private FusedLocationProviderClient mFusedLocationClient;
    private LocationRequest locationRequest;
    private LocationCallback locationCallback;
    public static Location userLocation =null;
    private boolean isGPS = false;
    private static Button menu;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate( savedInstanceState );
        setContentView( R.layout.activity_general_board );

        name = findViewById(R.id.header);
        name.setText(EntrenceBoard.path);
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        locationRequest = LocationRequest.create();
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationRequest.setInterval(10 * 1000); // 10 seconds
        locationRequest.setFastestInterval(5 * 1000); // 5 seconds

        new GpsUtils(this).turnGPSOn( new GpsUtils.onGpsListener() {
            @Override
            public void gpsStatus(boolean isGPSEnable) {
                // turn on GPS
                isGPS = isGPSEnable;
            }
        });

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null) {
                    return;
                }
                for (Location location : locationResult.getLocations()) {

                    if (location != null) {
                        userLocation =location;
                     adapter.notifyDataSetChanged();
                    }
                }
            }
        };


        if (!isGPS) {
            Toast.makeText(this, "Please turn on GPS", Toast.LENGTH_SHORT).show();
            return;
        }

        getLocation();
        /**
         * Read the object fom the database
         */
        mDatabasePharmsListener = mDatabasePharms
                .addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        list_pharm.clear();
                        String time=""+Calendar.getInstance().getTime();
                        time=time.substring(0,13 );
                        for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                            Pharm ph = snapshot.getValue(Pharm.class);

                            /**
                             * Check how many people wait now
                             */
                            String time_ph;
                            Set<Map.Entry<String,String>> e = ph.getWait().entrySet();

                            for (Map.Entry<String, String> it: e){
                                time_ph=it.getValue();
                                time_ph=time_ph.substring( 0,13 );
                                if(!time_ph.equals( time )) {
                                    ph.getWait().remove( it.getKey() );
                                    FirebaseDatabase mDatabase = FirebaseDatabase.getInstance();
                                     DatabaseReference dbRefa= mDatabase.getReference("/Pharms/"+ph.getName()+"/wait/"+it.getKey());
                                     dbRefa.removeValue();
                                }
                            }

                            list_pharm.add(ph);

                        }
                        adapter.notifyDataSetChanged();



                    }
                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                    }
                });

        // Get ListView object from xml
        listView = (ListView) findViewById(R.id.list);
        adapter= new row_item(list_pharm,getApplicationContext());

        listView.setAdapter(adapter);

        menu = (Button) findViewById(R.id.gotomenu);
        menu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Paper.book().write(AppConstants.Userprefer , "no");
                Intent i= new Intent(GeneralBoard.this,EntrenceBoard.class);
                startActivity(i);
                finish();


            }


        });




        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                Pharm dataModel= list_pharm.get(position);
                Location loc = new Location("");
                loc.setLatitude(dataModel.getLat());
                loc.setLongitude(dataModel.getLon());
                if(userLocation!=null) {
                    String distance = row_item.df.format( userLocation.
                            distanceTo( loc ) / 1000 );
                    /**
                     * check your location close to pharmcy
                     */
                    double check = Double.parseDouble( distance );
                    if (check < 0.061) {
                        Metadata.current_obj = dataModel.getName();
                        //AdvertisementProperties.advertisementPosition = itemPosition;
                        Intent intent = new Intent( GeneralBoard.this, InsideLine.class );
                        startActivity( intent );
                    } else
                        Toast.makeText( GeneralBoard.this, "הינך לא בבית מרקחת", Toast.LENGTH_SHORT ).show();
                }
                else
                    Toast.makeText( GeneralBoard.this, "המתן לטעינת מיקום", Toast.LENGTH_SHORT ).show();
                }
        });
    }


    private void getLocation() {
        if (ActivityCompat.checkSelfPermission(GeneralBoard.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(GeneralBoard.this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(GeneralBoard.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},
                    AppConstants.LOCATION_REQUEST);

        } else {
                mFusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);

        }
    }
    @SuppressLint("MissingPermission")
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case 1000: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {


                        mFusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);


                } else {
                    Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show();
                }
                break;
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == AppConstants.GPS_REQUEST) {
                isGPS = true; // flag maintain before get location
            }
        }
    }
}
