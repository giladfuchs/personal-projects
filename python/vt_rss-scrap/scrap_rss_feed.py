import argparse
import csv
import os
import json


import xmltojson
import xmltodict

import xml.etree.ElementTree as ET
from requests_html import HTMLSession

from common.consts import IOCs, RSS_URL
from common.logger import log


def get_rss_feed(url: str=None) -> ET:
    if url is None:
        url = RSS_URL
    try:
        session = HTMLSession()
        response = session.get(url)

    except Exception as ex:
        log.exception(f'problem with request. ex: {str(ex)}')
        return None
    log.debug('get response rss feed')
    try:
        html = response.html.html
        xml_tree = ET.ElementTree(ET.fromstring(html))
        log.debug('parse rss feed to ElementTree')

        return xml_tree
    except Exception as ex:
        log.exception(f'request cannot format to ElementTree(xml). ex: {str(ex)}')
        return None


def parse_xml_to_json(xml_tree: ET) -> dict:
    try:

        root = xml_tree.getroot()

        to_string = ET.tostring(root, encoding='UTF-8', method='xml')

        xml_to_dict = xmltodict.parse(to_string)
        return xml_to_dict['rss']['channel']['item']

    except Exception as ex:
        log.exception(f'there was a problem in parsing. ex: {str(ex)}')


def parse_html_to_json(html_:str)-> [dict]:
    html_ans = []
    errors = ''
    html = [st for st in html_.split('\n') if st]
    for h in html:
        try:

            json_ = xmltojson.parse(h)
            json_ = json.loads(json_)
            html_ans.append(json_)
        except:
            errors += h
            try:
                json_ = xmltojson.parse(errors)
                html_ans.append(json_)
                errors = ''

            except:
                pass
    if errors:
        log.error(f'some html faild to parse {errors[:50]} ...')
    return html_ans

# iocs could be in h1 or h3
def get_sub_json_of_iocs(json_html: [dict]) -> [dict]:
    try:
        # check with h1
        index_begin_iocs = next((index for (index, _json_of_html_attribute) in enumerate(json_html) if
                                 type(_json_of_html_attribute) is dict and IOCs in _json_of_html_attribute.get('h1', '')), None)
        if index_begin_iocs:
            index_end_iocs = next((index for (index, _json_of_html_attribute) in enumerate(json_html[index_begin_iocs + 1:])
                                   if 'h1' in _json_of_html_attribute), None)
            json_html = json_html[index_begin_iocs: index_begin_iocs + index_end_iocs] if index_end_iocs\
                else json_html[index_begin_iocs:]

        else:
            # check with h3

            index_begin_iocs = next((index for (index, _json_of_html_attribute) in enumerate(json_html) if
                                     type(_json_of_html_attribute) is dict and 'h3' in _json_of_html_attribute and IOCs in
                                     _json_of_html_attribute['h3'].get('strong',
                                                                       '')),
                                    None)
            if index_begin_iocs:
                index_end_iocs = next((index for (index, d) in enumerate(json_html[index_begin_iocs + 1:]) if 'h3' in d),
                                      None)
            json_html = json_html[index_begin_iocs: index_begin_iocs + index_end_iocs] if \
                index_end_iocs else json_html[index_begin_iocs:]

    except Exception as ex:
        log.exception(f'{str(ex)}')
        return None
    return json_html


def json_iocs_to_list_matrix(json_iocs: [dict], pubDate: str, title: str) -> [dict]:
    list_to_make_csv = []
    ioc_type = None
    try:
        for _ in json_iocs:
            if type(_) is dict:
                h2 = _.get('h2')
                if h2:
                    ioc_type = h2
                else:
                    td = _.get('td')
                    if td:
                        if ioc_type:
                            list_to_make_csv.append({'pubDate': pubDate, 'title': title, 'ioc_type': ioc_type, 'ioc': td.get('code')})
                        else:
                            ioc_type, ioc = td.get('@width'), td.get('#text')
                            if ioc_type and ioc:
                                list_to_make_csv.append({'pubDate': pubDate, 'title': title, 'ioc_type': ioc_type, 'ioc': ioc})
                            ioc_type = None
    except Exception as ex:
        log.exception(f'{str(ex)}')

    return list_to_make_csv


def list_matrix_to_csv(list_matrix: [dict], filename: str):
    try:
        data_file = open(f'{os.getcwd()}/csv_file/{filename}.csv', 'w', newline='')
        csv_writer = csv.writer(data_file)
        header = list_matrix[0].keys()
        csv_writer.writerow(header)
        for data in list_matrix:
            csv_writer.writerow(data.values())
    except Exception as ex:
        log.exception(f'failed to generate csv file. ex: {str(ex)}')


def find_iocs(list_of_rss_feed: [dict]) -> dict:
    for _ in list_of_rss_feed:
        try:
            html = _.get('ns3:encoded')
            if IOCs in html:
                json_html = parse_html_to_json(html)
                pubDate, title = _.get('pubDate'), _.get('title')
                log.debug(f'try to parse to csv with name {title}')
                json_iocs = get_sub_json_of_iocs(json_html)
                if not json_iocs:
                    log.debug(f'no json with iocs to try to make csv with name {title}')
                    continue

                list_to_make_csv = json_iocs_to_list_matrix(json_iocs, pubDate=pubDate, title=title)

                if list_to_make_csv:
                    list_matrix_to_csv(list_matrix=list_to_make_csv, filename=title)
                else:
                    log.debug(f'failed to parse to csv with name {title}')
        except Exception as ex:
            log.exception(f'{str(ex)}')

def _work(url=None):
    log.debug('start script')

    rss_feed_html = get_rss_feed(url=url)
    json_html = parse_xml_to_json(rss_feed_html)
    if json_html:
        log.debug(f'successes parse xml to json')
        log.info('\n')
        log.info([{'date': _.get('pubDate'), 'title': _.get('title')} for _ in json_html])
        log.info('\n')

        find_iocs(json_html)
    log.debug('finish script')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='RSS Feed CheckPoint.')

    parser.add_argument("-u", "--url", help="url to scrap rss feed. ", type=str, default=None)

    args = parser.parse_args()
    _work(args.url)

