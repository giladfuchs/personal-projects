package com.matan.login_and_signup;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.matan.coin.Board;
import com.matan.data_holder.UserHold;
import com.matan.objects.User;
import com.matan.coin.R;

import java.nio.channels.Channel;
import java.util.ArrayList;

import io.paperdb.Paper;
import io.reactivex.annotations.NonNull;

import static android.app.PendingIntent.getActivity;
import static com.matan.login_and_signup.Utils.Channel;

public class MainActivity extends AppCompatActivity {

    private static FragmentManager fragmentManager;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
            //read();
        fragmentManager = getSupportFragmentManager();

        Paper.init(this);

        // If savedinstnacestate is null then replace login fragment
        if (savedInstanceState == null) {
            fragmentManager
                    .beginTransaction()
                    .replace(R.id.frameContainer, new Login(),
                            Utils.Login).commit();
        }

        // On close icon click finish activity
        findViewById(R.id.close_activity).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View arg0) {
                        finish();

                    }
                });

        String userEmailKey = Paper.book().read(Utils.UserEmailKey);
        String userPasswordKey = Paper.book().read(Utils.UserPasswordKey);

        //read email and password that be saved in firebase library
        if(userEmailKey != ""&&userPasswordKey!=""){
            if(!TextUtils.isEmpty(userEmailKey)&&!TextUtils.isEmpty(userPasswordKey)){
                autoLogIn(userEmailKey,userPasswordKey);
            }
            else{
                mAuth=FirebaseAuth.getInstance();
                mAuth.signOut();
            }
        }
    }

    /**
     * remember me
     * @param mail
     * @param password
     */
    private void autoLogIn(String mail, String password) {

        mAuth = FirebaseAuth.getInstance();
        Toast.makeText(MainActivity.this, "Do Login.", Toast.LENGTH_SHORT)
                .show();

        mAuth.signInWithEmailAndPassword(mail, password).addOnCompleteListener(MainActivity.this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@android.support.annotation.NonNull @NonNull Task<AuthResult> task) {
                UserHold.setUser_hold(mAuth.getCurrentUser().getUid());

                    Intent intent=new Intent(MainActivity.this,Loading.class);
                    startActivity(intent);
                    finish();
            }
        });
    }

    // Replace Login Fragment with animation
    protected void replaceLoginFragment() {
        fragmentManager
                .beginTransaction()
                .setCustomAnimations(R.anim.left_enter, R.anim.right_out)
                .replace(R.id.frameContainer, new Login(),
                        Utils.Login).commit();
    }

    @Override
    public void onBackPressed() {

        // Find the tag of signup and forgot password fragment
        Fragment SignUp_Fragment = fragmentManager
                .findFragmentByTag(Utils.SignUp);
        Fragment ForgotPassword_Fragment = fragmentManager
                .findFragmentByTag(Utils.ForgotPassword);

        // Check if both are null or not
        // If both are not null then replace login fragment else do backpressed
        // task

        if (SignUp_Fragment != null)
            replaceLoginFragment();
        else if (ForgotPassword_Fragment != null)
            replaceLoginFragment();
        else{
            // when back is pressed, go to home screen
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_HOME);
            //intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            /*finish();
            System.exit(0);*/
            return;
        }
    }


}
