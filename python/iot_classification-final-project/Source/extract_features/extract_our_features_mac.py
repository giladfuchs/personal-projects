
import math
import pandas as pd
import ObjectFile as obj
import glob
from timeit  import default_timer as timer

FMT = '%H:%M:%S.%f'

bulb = '00:17:88:7c:96:3c'
camera = '00:62:6e:6c:6f:36'
alexa = 'b0:fc:0d:bf:90:fd'

path = r'/home/gilad/PycharmProjects/IoT/csv/tshark' # use your path
all_files = glob.glob(path + "/*.csv")





li = []

for filename in all_files:
    df = pd.read_csv(filename, index_col=None, header=None)
    li.append(df)

data = pd.concat(li, axis=0, ignore_index=False, sort=False)
count_rows = int(int(data.shape[0])/1)
tel = {}
print(count_rows)


for x in range(count_rows):

    if x%1501 ==0:
        start = timer()

    r = obj.RowCsv(data.iloc[x,])
    iplen = float(r.get_ip_len())
    mac_src = r.get_eth_src()
    mac_dst = r.get_eth_dst()
    if not math.isnan(iplen): #check if it packege with len
        if mac_src == camera or mac_src == bulb  or mac_src == alexa  : # send msg only camera & bulb
            if mac_src not in tel:
                tel[mac_src] = []
            tel[mac_src].append(r)

        if mac_dst == camera or mac_dst == bulb or mac_dst == alexa: # receive msg only camera & bulb
            if mac_dst not in tel:
                tel[mac_dst] = []
            tel[mac_dst].append(r)

    if x % 3001 == 0:
        end = timer()
        print(end - start)


print(tel)
ls = {camera: {}, bulb: {}, alexa :{}}

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
                ls[k][time_stamp]=obj.Sample(size_msg, 0, 1, 0)
            else :
                (ls[k][time_stamp]).set_send(float((ls[k][time_stamp]).get_send()) + size_msg)
                (ls[k][time_stamp]).increase_count_send()

        else: #receive msg
            if time_stamp not in ls[k]:#first apperance of the timestamp key
                ls[k][time_stamp] = obj.Sample(0, size_msg, 0, 1)
            else:
                (ls[k][time_stamp]).set_receive(float((ls[k][time_stamp]).get_receive()) + size_msg)
                (ls[k][time_stamp]).increase_count_receive()



for k,v in ls.items():
    for ke,va in v.items():
        print(str("receive - "+str(va.get_receive())) + "  send - " + str(va.get_send()) + "     "+str(ke) + "   "+str(k) +
              "   "+str(va.get_count_send())+ "   "+str(va.get_count_receive()))


with open("/home/gilad/PycharmProjects/IoT/csv/big.csv", 'w') as output_file:


    for key, val in ls.items():
        if key == camera:
            str_type = 0
        elif key == bulb :
            str_type = 1
        else :
            str_type = 2
        for ke, va in val.items():
            output_file.write(str(str_type))
            if va. get_count_send() > 0 :
                output_file.write( ', ' + str(va.get_send()/va. get_count_send() )+', '+str(va. get_count_send()))
            else :
                output_file.write( ', ' + str(0) + ', ' + str(0))

            if va.get_count_receive() > 0 :
                output_file.write( ', ' + str(va.get_receive()/va. get_count_receive())+', '+str(va. get_count_receive()))
            else:
                output_file.write(', ' + str(0) + ', ' + str(0))
            output_file.write('\n ')





