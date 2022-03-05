
from datetime import datetime
import math
import pandas as pd
import ObjectFile as obj
import  numpy as np
import glob
from timeit  import default_timer as timer

FMT = '%H:%M:%S.%f'

ip = '00:17:88:7c:96:3c'
camera = '00:62:6e:6c:6f:36'
alexa = 'b0:fc:0d:bf:90:fd'
# N=10
path = r'/home/gilad/PycharmProjects/IoT/csv/tshark' # use your path
all_files = glob.glob(path + "/*.csv")


start =timer()


li = []

for filename in all_files:
    df = pd.read_csv(filename, index_col=None, header=None)
    li.append(df)

data = pd.concat(li, axis=0, ignore_index=False, sort=False)
count_rows = int(int(data.shape[0])/1)
tel = {}
print(count_rows)
#time
end = timer()
print( end - start)
start = timer()

for x in range(count_rows):

    if x%1501 ==0:
        start = timer()

    r = obj.RowCsv(data.iloc[x,])
    iplen = float(r.get_ip_len())
    ip_src = r.get_ip_src()
    ip_dst = r.get_ip_dst()
    if not math.isnan(iplen): #check if it packege with len
        if ip_src == ip  : # send msg only camera & bulb
            if ip not in tel:
                tel[ip] = []
            tel[ip].append(r)

        if ip_dst == ip: # receive msg only camera & bulb
            if ip not in tel:
                tel[ip] = []
            tel[ip].append(r)

    if x % 3001 == 0:
        end = timer()
        print(end - start)

#time
end =timer()
print( end - start)
start = timer()
print(tel)
for N in range(3,13) :

    ls = {ip: {}}

    # order the data by time stamp
    for k, v in tel.items():
        for row in v:


            time_stamp = row.get_time()
            time_stamp = time_stamp[9: 16] + "0"

            #time for distance time feature
            time = row.get_time()
            time = str(time[9: 25])


            size_msg=float(row.get_ip_len())
            if row.get_eth_src() == k:  #send msg
                if time_stamp not in ls[k]:  #first apperance of the timestamp key
                    ls[k][time_stamp]=obj.Sample_merge(size_msg, 0, 1, 0)
                    (ls[k][time_stamp]).set_last_time_send(time)
                else :
                    (ls[k][time_stamp]).set_send_avg(float((ls[k][time_stamp]).get_send_avg()) + size_msg)
                    (ls[k][time_stamp]).increase_count_send()
                    if (ls[k][time_stamp]).get_count_send() < N : #check if there is a room for more sample
                        (ls[k][time_stamp]).set_send(float((ls[k][time_stamp]).get_send()) + size_msg)

                        last_time=str((ls[k][time_stamp]).get_last_time_send())
                        if last_time !='0' : #check if it's not the  first apperance of the send timestamp key
                            tdelta = datetime.strptime(time, FMT) - datetime.strptime(last_time, FMT)
                            tdelta = tdelta.total_seconds()
                            tdelta = np.float64(tdelta)
                            (ls[k][time_stamp]).get_time_send_ls().append(tdelta)

                        (ls[k][time_stamp]).set_last_time_send(time)
            else: #receive msg
                if time_stamp not in ls[k]:#first apperance of the timestamp key
                    ls[k][time_stamp] = obj.Sample_merge(0, size_msg, 0, 1)
                    (ls[k][time_stamp]).set_last_time_receive(time)

                else:
                    (ls[k][time_stamp]).set_receive_avg(float((ls[k][time_stamp]).get_receive_avg()) + size_msg)
                    (ls[k][time_stamp]).increase_count_receive()
                    if (ls[k][time_stamp]).get_count_receive() < N:
                        (ls[k][time_stamp]).set_receive(float((ls[k][time_stamp]).get_receive()) + size_msg)

                        last_time = str((ls[k][time_stamp]).get_last_time_receive())
                        if last_time != '0':#check if it's not the  first apperance of the receive timestamp key
                            tdelta = datetime.strptime(time, FMT) - datetime.strptime(last_time, FMT)
                            tdelta=tdelta.total_seconds()
                            tdelta=np.float64(tdelta)
                            (ls[k][time_stamp]).get_time_receive_ls().append(tdelta)

                        (ls[k][time_stamp]).set_last_time_receive(time)

    #time
    end = timer()
    print( end - start)
    start = timer()

    for k,v in ls.items():
        for ke,va in v.items():
            print(str("receive - "+str(va.get_receive())) + "  send - " + str(va.get_send()) + "     "+str(ke) + "   "+str(k) + "   "+str(va.get_time_receive_ls())+ "   "+str(va.get_time_send_ls()))

    #time
    end =timer()
    print( end - start)
    start =timer()
    with open("/home/gilad/PycharmProjects/IoT/csv/expr.csv"+str(N-2) +".csv", 'w') as output_file:


        for key, val in ls.items():
            for ke, va in val.items():
                if va. get_count_receive() >= N and va. get_count_send() >= N :
                    output_file.write(str(va.get_send())+', '+ str(va.get_receive()))
                    output_file.write(', ' + str(va.get_send_avg() / va.get_count_send()) + ', ' + str(va.get_count_send()))
                    output_file.write(', ' + str(va.get_receive_avg() / va.get_count_receive()) + ', ' + str(va.get_count_receive()))
                    for elements in (va.get_time_send_ls()):
                        output_file.write(', '+str(elements))
                    for elements in (va.get_time_receive_ls()):
                        output_file.write(', ' + str(elements))
                    output_file.write('\n ')

#time
end = timer()
print( end - start)
start = timer()





