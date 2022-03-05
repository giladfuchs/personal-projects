import hashlib
import string
import random
import requests
import argparse
from time import sleep

from common.consts import BASE_URL, API_KEY, NUMBER_FOR_MALICIOUS, COMPANIES, DETECTED, RANDOM_WORD_LENGTH, SLEEP_TIME, RETRY
from common.logger import log

def scan_sha1_str_to_scan_id(sha1_str: str) -> str:
    url = f'{BASE_URL}/scan'
    params = {'apikey': API_KEY}
    files = {'file': sha1_str}
    try:
        response = requests.post(url=url, files=files, params=params)
        res = response.json()
        log.debug(f'response: {str(res)}')
    except Exception as ex:
        log.exception(f'problem with request. ex: {str(ex)}')
        return None

    response_code = res.get('response_code')
    if not response_code:
        log.error(f"bad request. ex: {res.get('verbose_msg')}")
        return None

    scan_id = res.get('scan_id')
    if scan_id is None:
        log.error(f"no scan_id. ex: {res.get('verbose_msg')}")

    return scan_id

def report(scan_id:str)-> dict:
    params = dict(apikey=API_KEY, resource=scan_id, allinfo=True)
    url = f'{BASE_URL}/report'
    response_code, num_of_req = -2, 0
    try:
        while response_code < 1 and num_of_req < RETRY:
            log.debug(f'sleep for {SLEEP_TIME} seconds and then check if there is a report')
            sleep(SLEEP_TIME)

            response = requests.get(url=url, params=params)
            if response.status_code == 200:
                res = response.json()
                log.debug(f'response: {str(res)}')
                response_code = res.get('response_code')
            else:
                log.error(f"bad request. status_code: {response.status_code}, text: {response.text}")

            num_of_req += 1
        return res.get('scans')
    except Exception as ex:
        log.exception(f'problem with request. ex: {str(ex)}')

def check_malicious_in_report(scans: dict):
    # Todo there is no checkpoint. Sometimes I have microsoft.
    for company in COMPANIES:
        company_exist: dict = scans.get(company)
        if company_exist and company_exist.get(DETECTED):
            log.info('\n')
            log.info(f'{company} {DETECTED} Malicious')

    number_of_detect = [_.get('detected') for _ in scans.values()].count(True)
    if number_of_detect > NUMBER_FOR_MALICIOUS:
        log.info('\n')
        log.info(f'{number_of_detect} companies {DETECTED} Malicious')

def create_sha1(word:str=None)->str:
    if word is None:
        word = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(RANDOM_WORD_LENGTH))

    word = word.encode()
    hash_object = hashlib.sha1(word)
    pbHash = hash_object.hexdigest()
    return pbHash

def _work(word:str=None, sha1_str:str=None):
    log.debug('start script')
    if sha1_str is None:
        sha1_str = create_sha1(word=word)
    scan_id = scan_sha1_str_to_scan_id(sha1_str=sha1_str)

    if scan_id:
        scans = report(scan_id=scan_id)
        if scans:
            check_malicious_in_report(scans=scans)
        else:
            log.error('no scans in response')

    log.debug('finish script')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='VT score program.')

    parser.add_argument("-w", "--word", help="You chan choose str to make sha1 or use some random with default word=None.", type=str, default=None)
    parser.add_argument("-sh", "--sha1", help="you can pass str of sha1 and this script will check it.", type=str, default=None)

    args = parser.parse_args()

    _work(word=args.word, sha1_str=args.sha1)

