package com.matan.private_zone;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.matan.coin.R;
import com.matan.data_holder.UserHold;
import com.matan.login_and_signup.Loading;
import com.matan.login_and_signup.Utils;
import com.matan.objects.Advertisement;
import com.matan.objects.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Currency;
import java.util.Locale;

import io.reactivex.annotations.NonNull;

import static com.matan.login_and_signup.Utils.Channel;

public class ModifyAdvertisement extends AppCompatActivity {

    private static Spinner dropdownSourceCoins, dropdownDestCoins, dropdownCities;
    private static EditText amount;

    private  FirebaseDatabase mDatabase;
    private DatabaseReference dbRef;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_modify_advertisement);


        final Button privateZoneActivity = (Button)findViewById(R.id.modifyAdverBtn);
        privateZoneActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               delete();

                add_adv(dropdownSourceCoins.getSelectedItem().toString(),dropdownDestCoins.getSelectedItem().toString(),dropdownCities.getSelectedItem().toString());
                Intent intent = new Intent(ModifyAdvertisement.this,LoadingPrivateZone.class);
                startActivity(intent);
                finish();


            }
        });
        final Button delete = (Button)findViewById(R.id.deleteBtn);
        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                delete();

                Utils.flag = true;
                Intent intent = new Intent(ModifyAdvertisement.this,LoadingPrivateZone.class);
                startActivity(intent);
                finish();


            }
        });

        /*

         */

        //get the spinner from the xml.
        dropdownSourceCoins = findViewById(R.id.sourceCoin);
        //get the spinner from the xml.
        dropdownDestCoins = findViewById(R.id.destinationCoin);
        ArrayList<String> currencys = new ArrayList<String>();

        Locale[] locs = Locale.getAvailableLocales();
        for(Locale loc : locs) {
            try {
                String val=Currency.getInstance(loc).getDisplayName() +" , " + Currency.getInstance(loc).getSymbol();
                if(!currencys.contains(val))
                    currencys.add(val);
            } catch(Exception exc)
            {
                // Locale not found
            }
            Collections.sort(currencys);
        }

        //create an adapter to describe how the items are displayed
        ArrayAdapter<String> adapterSpinnerCoins = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, currencys);
        //set the spinners adapter to the previously created one.
        dropdownSourceCoins.setAdapter(adapterSpinnerCoins);
        //set the spinners adapter to the previously created one.
        dropdownDestCoins.setAdapter(adapterSpinnerCoins);


        /*
        Drop down list of cities
         */

        //get the spinner from the xml.
        dropdownCities = findViewById(R.id.location);
        //create a list of items for the spinner.
        String[] itemsCities = new String[]{"Lod", "Tel Aviv", "Jerusalem", "Kfar Saba", "Or Yehuda", "Azor", "Bat Yam", "Ramat Gan", "Holon", "Ashdod", "Beersheba", "Yehud", "Rishon LeZion", "Hazav", "Ness Ziona", "Eilat", "Rehovot", "Herzliya", "Nahariya", "Haifa", "Shave Ziyyon", "Ramat HaSharon", "Ramat Poleg", "Kadima", "Karmi'el", "Pardesiyya", "Netanya", "Gan Yavne", "Petah Tikwah", "Ashqelon", "Savyon", "Naham", "Mazkeret Batya", "`Arugot", "Ofaqim", "Shetulim", "Hadera", "Qiryat Bialik", "Tel Mond", "Hod HaSharon", "Qiryat Yam", "Shelomi", "Binyamina", "Liman", "`Alma", "Ramla", "Nazareth", "Et Taiyiba", "Rinnatya", "Yavne", "Acre", "Nazerat `Illit", "Baraq", "Even Yehuda", "Nesher", "Pardes Hanna Karkur", "Netivot", "Tirat Karmel", "Or `Aqiva", "Kefar Yona", "Bet Oren", "Haluz", "Biriyya", "Gan Hayyim", "Qiryat Tiv`on", "Qiryat Gat", "Be'er Toviyya", "`En Ayyala", "Misgav Regional Council", "Safed", "Gedera", "Dimona", "Bet Shemesh", "`En HaShelosha", "Herut", "Mazor", "Shamir", "Ra'anana", "Bat Hadar", "Rosh Ha'Ayin", "Zoran", "Tirat Yehuda", "Bareqet", "Elyakhin", "Hadid", "Hadar Ramatayim", "Modiin", "Hazor Ashdod", "Kefar Daniyyel", "Newe Efrayim", "Talme Menashe", "Kefar Netter", "Mazliah", "Moran", "Shoval", "Ramat Aviv", "Afiqim", "Ramat Dawid", "Sde Warburg", "Magen", "Karkur", "Qiryat Ata", "Maghar", "Bet Alfa", "Timrat", "Elyaqim", "Bet Dagan", "Ginnosar", "Qiryat Mal'akhi", "Hadar `Am", "maalot Tarshiha", "Ahituv", "Qiryat Motzkin", "Migdal", "Bat Hefer", "Ben Shemen-Kefar Hano`ar", "Emunim", "Tiberias", "Mikhmoret", "Hever", "Ramat Yishay", "Sderot", "Gimzo", "Mesillat Ziyyon", "Pasuta", "Bet She'an", "Newe Yamin", "Nordiyya", "HaKarmel", "Gibbeton", "Qiryat Ono", "Sarid", "Nir Zevi", "Ramat Ef`al", "Bene Ziyyon", "Hurfeish", "Shefayim", "Dabburiya", "Rishpon", "Mizpe Netofa", "Sde Boker", "Yaqum", "Bahan", "Jaffa", "Allonim", "`Evron", "Hazor HaGelilit", "Ramot Naftali", "Giv`at Hayyim", "Urim", "Sedot Yam", "`Aseret", "Nirim", "`Amir", "Ganne Tiqwa", "Ma`agan Mikha'el", "Qiryat Hayyim", "Kefar Witqin"};
        //create an adapter to describe how the items are displayed
        ArrayAdapter<String> adapterSpinnerCities = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, itemsCities);
        //set the spinners adapter to the previously created one.
        dropdownCities.setAdapter(adapterSpinnerCities);

        amount =(EditText) findViewById(R.id.amount);
        /**
         * set the list in what was in the adv
         */

        int spinnerPosition = adapterSpinnerCities.getPosition(PrivateZone.mod_adv.getLocation());
        dropdownCities.setSelection(spinnerPosition);

        spinnerPosition=adapterSpinnerCoins.getPosition(PrivateZone.mod_adv.getSource_Coin());
        dropdownSourceCoins.setSelection(spinnerPosition);

        spinnerPosition=adapterSpinnerCoins.getPosition(PrivateZone.mod_adv.getDestination_Coin());
        dropdownDestCoins.setSelection(spinnerPosition);

        amount.setText(PrivateZone.mod_adv.getAmount());


    }



    private  void add_adv(String src_coin,String dest_coin,String location) {

        mDatabase = FirebaseDatabase.getInstance();
        dbRef = mDatabase.getReference("/advertisements");
        String Key_adv =dbRef.push().getKey();
        dbRef.child("/"+Key_adv).setValue(new Advertisement(Key_adv, FirebaseAuth.getInstance().getCurrentUser().getEmail(),UserHold.getPhone(),src_coin,dest_coin,location,amount.getText().toString()));
        dbRef = mDatabase.getReference("/user/"+UserHold.getKey_User());
        dbRef.child("adv").child("/"+Key_adv).setValue(UserHold.getKey_User());
        createChannel();
        addNotification(Channel);
        Utils.flag = true;
    }
    private void delete(){
        String adv_key=   PrivateZone.mod_adv.getAdv_key();
        FirebaseDatabase mDatabase;
        DatabaseReference dbRef;
        mDatabase = FirebaseDatabase.getInstance();
        dbRef = mDatabase.getReference("/advertisements");

        dbRef.child("/"+adv_key).setValue(null);
        dbRef = mDatabase.getReference("/user/"+UserHold.getKey_User());
        dbRef.child("adv").child("/"+adv_key).setValue(null);
    }
    private void createChannel()
    {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager mNotificationManager = getSystemService(NotificationManager.class);
            String id = Channel;
            CharSequence name = "Chat";
            String description = "message from user a";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel mChannel = new NotificationChannel(id, name, importance);
            mChannel.setDescription(description);

            mNotificationManager.createNotificationChannel(mChannel);

        }
    }
    private void addNotification(String channel)
    {
        Log.i("Add notification","here");
        Intent landingIntent = new Intent(this, Loading.class);
        PendingIntent pendingLandingIntent = PendingIntent.getActivity(this,0,landingIntent,PendingIntent.FLAG_UPDATE_CURRENT);

        Notification.Builder notificationBuilder;

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
            notificationBuilder = new Notification.Builder(this,channel);
        }
        else
        {
            notificationBuilder = new Notification.Builder(this);
        }

        Notification notification = notificationBuilder
                .setContentTitle("notification type"+channel)
                .setSmallIcon(R.drawable.email)
                .setContentText("User modified an advertisement in "+channel)
                .setContentIntent(pendingLandingIntent)
                .setAutoCancel(true).build();
        NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify((int)System.currentTimeMillis(),notification);
    }
}
