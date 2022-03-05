package com.coders.location;

import android.content.Context;
import android.location.Location;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.coders.location.GeneralBoard;
import com.coders.location.Object.Pharm;
import com.coders.location.R;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;


public class row_item extends ArrayAdapter<Pharm> implements View.OnClickListener{
    static DecimalFormat df = new DecimalFormat("#.##");
    Context mContext;
    private  Location loc;
    private  String s_loc="שגיאת מיקום";
    private  ViewHolder viewHolder;
    // View lookup cache

    private static class ViewHolder {
        TextView name;
        TextView txtLocation;
        TextView avg_time;
        TextView in_line;

    }

    public row_item(ArrayList<Pharm> data, Context context) {
        super(context, R.layout.activity_row_item, data);
        this.mContext=context;

    }





    @Override
    public void onClick(View v) {

        int position=(Integer) v.getTag();
        Object object= getItem(position);

        switch (v.getId())
        {
            //case R.id.item_info:


            // break;
        }
    }

    private int lastPosition = -1;
    //                                                                                                                                                            static ViewHolder viewHolder;

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Pharm dataModel = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        // view lookup cache stored in tag

        final View result;

        if (convertView == null) {

            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.activity_row_item, parent, false);

            viewHolder.name = (TextView) convertView.findViewById(R.id.name);
            viewHolder.txtLocation = (TextView) convertView.findViewById(R.id.location);
            viewHolder.avg_time = (TextView) convertView.findViewById(R.id.avgTime);
            viewHolder.in_line = (TextView) convertView.findViewById(R.id.inLine);
            result=convertView;

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
            result=convertView;
        }
        lastPosition = position;

        //viewHolder.txtEmail.setText(dataModel.getEmail());
        //viewHolder.txtAmount.setText(dataModel.getAmount());
        viewHolder.name.setText("שם: "+dataModel.getName());
        Iterator<Map.Entry<String, Integer>> entries = dataModel.getVisit().entrySet().iterator();
        Set<Map.Entry<String,Integer>> e = dataModel.getVisit().entrySet();
        int time_wait =0;
        int count=0,i=0;
        /**
         * take the last five
         */
        for (Map.Entry<String, Integer> it: e ) {
            if(i+6>dataModel.getVisit().size()){
            time_wait += it.getValue();
            count++;
        }
        i++;
        }
        viewHolder.avg_time.setText("זמן המתנה: "+(time_wait/count)/60
                +"."+(time_wait/count)%60+" דק' ");

        viewHolder.in_line.setText(  "כרגע  בתור: " +dataModel.getWait().size() );

        loc = new Location("");
        loc.setLatitude(dataModel.getLat());
        loc.setLongitude(dataModel.getLon());
        if(GeneralBoard.userLocation != null) {
            s_loc = "מרחק:" + df.format( GeneralBoard.userLocation.
                    distanceTo( loc ) / 1000 ) + " km";
        }
        viewHolder.txtLocation.setText(s_loc);

        return convertView;
    }


}
