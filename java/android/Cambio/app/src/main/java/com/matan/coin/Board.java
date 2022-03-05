package com.matan.coin;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.matan.Chat.LoadingChat;
import com.matan.Chat.MainChat;
import com.matan.login_and_signup.Loading;
import com.matan.login_and_signup.MainActivity;
import com.matan.login_and_signup.Utils;
import com.matan.objects.Advertisement;
import com.matan.objects.User;
import com.matan.private_zone.LoadingPrivateZone;
import com.matan.private_zone.PrivateZone;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Currency;
import java.util.Locale;

import static com.matan.login_and_signup.Utils.Channel;

public class Board extends AppCompatActivity {
    private FirebaseDatabase mDatabase;
    private DatabaseReference dbRef;
    public  static  String filter_location,filter_coinSrc,filter_coinDst;
    ArrayList<Advertisement> dataModels;
    ListView listView;
    private static CustomAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_board);

        Utils.flag = false;


        /*
        Drop down list of cities
         */

        //get the spinner from the xml.
        final Spinner dropdownCities = findViewById(R.id.location);
        //create a list of items for the spinner.
        String[] itemsCities = new String[]{"Lod", "Tel Aviv", "Jerusalem", "Kfar Saba", "Or Yehuda", "Azor", "Bat Yam", "Ramat Gan", "Holon", "Ashdod", "Beersheba", "Yehud", "Rishon LeZion", "Hazav", "Ness Ziona", "Eilat", "Rehovot", "Herzliya", "Nahariya", "Haifa", "Shave Ziyyon", "Ramat HaSharon", "Ramat Poleg", "Kadima", "Karmi'el", "Pardesiyya", "Netanya", "Gan Yavne", "Petah Tikwah", "Ashqelon", "Savyon", "Naham", "Mazkeret Batya", "`Arugot", "Ofaqim", "Shetulim", "Hadera", "Qiryat Bialik", "Tel Mond", "Hod HaSharon", "Qiryat Yam", "Shelomi", "Binyamina", "Liman", "`Alma", "Ramla", "Nazareth", "Et Taiyiba", "Rinnatya", "Yavne", "Acre", "Nazerat `Illit", "Baraq", "Even Yehuda", "Nesher", "Pardes Hanna Karkur", "Netivot", "Tirat Karmel", "Or `Aqiva", "Kefar Yona", "Bet Oren", "Haluz", "Biriyya", "Gan Hayyim", "Qiryat Tiv`on", "Qiryat Gat", "Be'er Toviyya", "`En Ayyala", "Misgav Regional Council", "Safed", "Gedera", "Dimona", "Bet Shemesh", "`En HaShelosha", "Herut", "Mazor", "Shamir", "Ra'anana", "Bat Hadar", "Rosh Ha'Ayin", "Zoran", "Tirat Yehuda", "Bareqet", "Elyakhin", "Hadid", "Hadar Ramatayim", "Modiin", "Hazor Ashdod", "Kefar Daniyyel", "Newe Efrayim", "Talme Menashe", "Kefar Netter", "Mazliah", "Moran", "Shoval", "Ramat Aviv", "Afiqim", "Ramat Dawid", "Sde Warburg", "Magen", "Karkur", "Qiryat Ata", "Maghar", "Bet Alfa", "Timrat", "Elyaqim", "Bet Dagan", "Ginnosar", "Qiryat Mal'akhi", "Hadar `Am", "maalot Tarshiha", "Ahituv", "Qiryat Motzkin", "Migdal", "Bat Hefer", "Ben Shemen-Kefar Hano`ar", "Emunim", "Tiberias", "Mikhmoret", "Hever", "Ramat Yishay", "Sderot", "Gimzo", "Mesillat Ziyyon", "Pasuta", "Bet She'an", "Newe Yamin", "Nordiyya", "HaKarmel", "Gibbeton", "Qiryat Ono", "Sarid", "Nir Zevi", "Ramat Ef`al", "Bene Ziyyon", "Hurfeish", "Shefayim", "Dabburiya", "Rishpon", "Mizpe Netofa", "Sde Boker", "Yaqum", "Bahan", "Jaffa", "Allonim", "`Evron", "Hazor HaGelilit", "Ramot Naftali", "Giv`at Hayyim", "Urim", "Sedot Yam", "`Aseret", "Nirim", "`Amir", "Ganne Tiqwa", "Ma`agan Mikha'el", "Qiryat Hayyim", "Kefar Witqin"};
        //create an adapter to describe how the items are displayed
        ArrayAdapter<String> adapterSpinnerCities = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, itemsCities);
        //set the spinners adapter to the previously created one.
        dropdownCities.setAdapter(adapterSpinnerCities);

       /*
        Drop down list of Coins
        */

        //get the spinner from the xml.
        final Spinner dropdownSourceCoins = findViewById(R.id.sourceCoin);
        //get the spinner from the xml.
        final Spinner dropdownDestCoins = findViewById(R.id.destinationCoin);
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
        list of all the advertisement
         */

        // Get ListView object from xml
        listView = (ListView) findViewById(R.id.list);





        adapter= new CustomAdapter(Loading.advertisements,getApplicationContext());

        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                Advertisement dataModel= Loading.advertisements.get(position);

             /*   Snackbar.make(view, dataModel.getLocation()+"\n"+dataModel.getSource_Coin()+" API: "+dataModel.getDestination_Coin(), Snackbar.LENGTH_LONG)
                        .setAction("No action", null).show();
*/
                // ListView Clicked item index
                int itemPosition = position;
                //MainChat.send=MainActivity.a.get(itemPosition);
                AdvertisementProperties.advertisement = Loading.advertisements.get(itemPosition);
                AdvertisementProperties.advertisementPosition = itemPosition;
                Intent intent = new Intent (Board.this, AdvertisementProperties.class);
                startActivity(intent);
            }
        });





         /*
        Button to go to PrivateZone
         */
        final Button privateZoneActivity = (Button)findViewById(R.id.privateZoneBtn);
        privateZoneActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(FirebaseAuth.getInstance().getCurrentUser() != null) {
                    Intent privateZoneIntent = new Intent(Board.this, LoadingPrivateZone.class);
                    startActivity(privateZoneIntent);
                }
                else{
                    Toast.makeText(getApplicationContext(),
                            "Guest" , Toast.LENGTH_LONG)
                            .show();
                }
            }
        });

                 /*
        Button to do filter
         */
        final Button FIlterActivity = (Button)findViewById(R.id.filterBtn);
        FIlterActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                filter_coinSrc=dropdownSourceCoins.getSelectedItem().toString();
                filter_coinDst=dropdownDestCoins.getSelectedItem().toString();
                filter_location=dropdownCities.getSelectedItem().toString();
                    Intent FIlterIntent = new Intent(Board.this, Filter.class);
                    startActivity(FIlterIntent);
                    finish();

            }
        });
        final Button refresh = (Button)findViewById(R.id.filterCancelBtn);
        refresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent FIlterIntent = new Intent(Board.this, Loading.class);
                startActivity(FIlterIntent);
                finish();

            }
        });
    }



    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_board_menu_drawer, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);

    }


    // when back is pressed, go to home screen


   
}
