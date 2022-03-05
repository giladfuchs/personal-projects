package com.matan.coin;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.matan.login_and_signup.Utils;
import com.matan.objects.Advertisement;
import com.matan.private_zone.LoadingPrivateZone;
import com.matan.private_zone.PrivateZone;

import java.util.ArrayList;

public class CustomAdapter extends ArrayAdapter<Advertisement> implements View.OnClickListener{

    private ArrayList<Advertisement> dataSet;
    Context mContext;

    // View lookup cache
    private static class ViewHolder {
        TextView txtEmail;
        TextView txtAmount;
        TextView txtSourceCoin;
        TextView txtDestinationCoin;
        TextView txtLocation;
        //ImageView info;
    }

    public CustomAdapter(ArrayList<Advertisement> data, Context context) {
        super(context, R.layout.row_item, data);
        this.dataSet = data;
        this.mContext=context;

    }

    /*
    Here when pressing on the button in the item
     */
    @Override
    public void onClick(View v) {

        int position=(Integer) v.getTag();
        Object object= getItem(position);
        PrivateZone.mod_adv =(Advertisement)object;

        switch (v.getId())
        {
            //case R.id.item_info:


               // break;
        }
    }

    private int lastPosition = -1;

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Advertisement dataModel = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        ViewHolder viewHolder; // view lookup cache stored in tag

        final View result;

        if (convertView == null) {

            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.row_item, parent, false);
            //viewHolder.txtEmail = (TextView) convertView.findViewById(R.id.name);
            //viewHolder.txtAmount = (TextView) convertView.findViewById(R.id.type);
            viewHolder.txtSourceCoin = (TextView) convertView.findViewById(R.id.sourceCoin);
            viewHolder.txtLocation = (TextView) convertView.findViewById(R.id.location);
            viewHolder.txtDestinationCoin = (TextView) convertView.findViewById(R.id.destCoin);
            //viewHolder.info = (ImageView) convertView.findViewById(R.id.item_info);

            result=convertView;

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
            result=convertView;
        }

        Animation animation = AnimationUtils.loadAnimation(mContext, (position > lastPosition) ? R.anim.up_from_bottom : R.anim.down_from_top);
        result.startAnimation(animation);
        lastPosition = position;

        //viewHolder.txtEmail.setText(dataModel.getEmail());
        //viewHolder.txtAmount.setText(dataModel.getAmount());
        viewHolder.txtSourceCoin.setText(dataModel.getSource_Coin());
        viewHolder.txtDestinationCoin.setText(dataModel.getDestination_Coin());
        viewHolder.txtLocation.setText(dataModel.getLocation());
        //viewHolder.info.setOnClickListener(this);
        //viewHolder.info.setTag(position);
        // Return the completed view to render on screen
        return convertView;
    }
}