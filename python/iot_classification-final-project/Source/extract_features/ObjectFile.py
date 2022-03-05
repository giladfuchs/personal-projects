class RowCsv:
    def __init__(self,arr):
        self.eth_src = arr[0]
        self.eth_dst =arr[1]
        self.ip_src = arr[2]
        self.ip_dst = arr[3]
        self.ip_len = arr[4]
        self.ip_proto = arr[5]
        self.time = arr[6]

    def get_eth_src(self):
        return self.eth_src

    def get_eth_dst(self):
        return self.eth_dst

    def get_ip_src(self):
        return self.ip_src

    def get_ip_dst(self):
        return self.ip_dst

    def get_ip_len(self):
        return self.ip_len

    def get_ip_proto(self):
        return self.ip_proto

    def get_time(self):
        return self.time


class Sample(object):
    def __init__(self, send ,receive ,count_send ,count_receive):
        self.send = send
        self.receive=receive
        self.count_send=count_send
        self.count_receive =count_receive

    def set_count_send(self, count_send):
        self.count_send = count_send

    def get_count_send(self):
        return self.count_send

    def increase_count_send(self):
        self.count_send += 1

    def set_count_receive(self,count_receive):
        self.count_receive = count_receive

    def increase_count_receive(self):
        self.count_receive += 1

    def get_count_receive(self):
        return self.count_receive

    def set_send(self,len):
        self.send = len

    def get_send(self):
        return self.send

    def set_receive(self,len):
        self.receive = len

    def get_receive(self):
        return self.receive

class Sample_big(Sample):


    def __init__(self, send, receive, count_send, count_receive):
        self.send = send
        self.receive = receive
        self.count_send = count_send
        self.count_receive = count_receive
        self.time_send_ls=[]
        self.time_receive_ls = []
        self.last_time_send=0
        self.last_time_receive = 0

    def set_last_time_receive(self,len):
        self.last_time_receive = len

    def get_last_time_receive(self):
        return self.last_time_receive

    def set_last_time_send(self, time):
        self.last_time_send = time

    def get_last_time_send(self):
        return self.last_time_send

    def get_time_send_ls(self):
        return self.time_send_ls

    def get_time_receive_ls(self):
        return self.time_receive_ls


class Sample_merge(Sample_big):


    def __init__(self, send, receive, count_send, count_receive):
        self.send = send
        self.receive = receive
        self.count_send = count_send
        self.count_receive = count_receive
        self.time_send_ls=[]
        self.time_receive_ls = []
        self.last_time_send=0
        self.last_time_receive = 0
        self.send_avg = send
        self.receive_avg = receive

    def set_send_avg(self,len):
        self.send_avg = len

    def get_send_avg(self):
        return self.send_avg

    def set_receive_avg(self,len):
        self.receive_avg = len

    def get_receive_avg(self):
        return self.receive_avg
