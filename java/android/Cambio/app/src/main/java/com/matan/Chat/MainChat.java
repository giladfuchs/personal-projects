package com.matan.Chat;

        import android.content.Intent;
        import android.support.v7.app.AppCompatActivity;
        import android.os.Bundle;
        import android.view.View;
        import android.widget.ArrayAdapter;
        import android.widget.Button;
        import android.widget.EditText;
        import android.widget.ListView;
        import android.widget.Toast;

        import com.google.firebase.database.DataSnapshot;
        import com.google.firebase.database.DatabaseError;
        import com.google.firebase.database.DatabaseReference;
        import com.google.firebase.database.FirebaseDatabase;
        import com.google.firebase.database.ValueEventListener;
        import com.matan.coin.R;
        import com.matan.data_holder.UserHold;
        import com.matan.login_and_signup.MainActivity;
        import com.matan.objects.Conversation;
        import com.matan.private_zone.PrivateZone;

        import java.text.DateFormat;
        import java.text.SimpleDateFormat;
        import java.util.ArrayList;
        import java.util.Date;
        import java.util.regex.Matcher;


        import io.paperdb.Paper;
        import io.reactivex.annotations.NonNull;

public class MainChat extends AppCompatActivity  {
    public  static  String send;
    private View view;
    private ListView messages;
    private EditText msgText;
    public static ArrayList<String> messagelist=new ArrayList<String>();
    private  String msg;
    private  static Button sendbutton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_chat);
        msgText = (EditText) findViewById(R.id.editText);
        messages = (ListView) findViewById(R.id.messages_view);

        final ArrayAdapter<String> listMessages = new ArrayAdapter<>
                (this,android.R.layout.simple_list_item_1,android.R.id.text1,LoadingChat.messagelist);

        messages.setAdapter(listMessages);

        sendbutton = (Button) findViewById(R.id.button2);
        sendbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                        /**
                         * sending the message
                         */
                        FirebaseDatabase mDatabase;
                        DatabaseReference dbRef;
                        msg = msgText.getText().toString();
                        mDatabase = FirebaseDatabase.getInstance();
                        dbRef = mDatabase.getReference("/chat");
                        dbRef.child(LoadingChat.Key_chat).child(GetTime()).child(UserHold.getKey_User()).setValue(msg);
                        msgText.setText("");
                        listMessages.add(msg);
                        messages.setAdapter(listMessages);

                    }


        });
    }
    private String GetTime () {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        return (dateFormat.format(date));
    }
}
