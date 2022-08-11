from rest_framework import status
from rest_framework.test import APITestCase

class AccountTests(APITestCase):
    base_url="http://127.0.0.1:8000/"
    short_url=None
    def test_create(self):

        url = f"{self.base_url}create"
        data = {"url":"https://stackoverflow.com/"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        short_url = f"{self.base_url}{response.data.get('short_url')}"
        response = self.client.get(short_url)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.url, data.get('url'))
        def get_first_url():
            response = self.client.get(f'{self.base_url}all')

            urls = response.data.get('urls', [])
            self.assertGreater(len(urls), 0)

            url_obj = urls[0]
            return url_obj
        def test_hit_counter():

            url_obj = get_first_url()
            # url_obj = next((_ for _ in urls if f"{self.base_url}s/{_.get('id')}" == short_url))
            short_url = f"{self.base_url}s/{url_obj.get('id')}"

            self.client.get(short_url)
            self.client.get(short_url)
            self.client.get(short_url)
            url_obj = get_first_url()

            self.assertEqual(url_obj.get('count'), 4)
        test_hit_counter()


    def test_not_exist(self):
        response = self.client.get(f'{self.base_url}s/-21')
        self.assertFalse(response.data.get("success"))
        self.assertEqual(response.data.get('error'), 'url short not found')

