from django.http import JsonResponse
import os
import json
from collections import defaultdict
from rest_framework.decorators import api_view

from app.settings import BASE_DIR

with open(os.path.join(BASE_DIR, 'static/task_data.json')) as data_file:
    json_data = json.loads(data_file.read())


@api_view(['GET'])
def get_dataset(request):
    tenants = json_data.get('tenants')
    return JsonResponse({"tenants": tenants})


@api_view(['GET'])
def get_series(request):
    series = defaultdict(list)
    startDate = request.GET.get('startDate')
    endDate = request.GET.get('endDate')
    tenantsIds = request.GET.get('tenantsIds', [])
    if tenantsIds:
        tenantsIds = [f'tenant_{tenant_id}' for tenant_id in tenantsIds.split(',')]
    payments_json = json_data.get('payments')
    dates = []
    for month in payments_json:
        if (startDate and startDate > month.get('payment_date')) or \
                (endDate and endDate < month.get('payment_date')):
            continue
        for key, pay in month.items():
            if key != 'payment_date':
                if not tenantsIds or key in tenantsIds:
                    series[key].append(pay or 0)
            else:
                dates.append(pay)

    series = [{"name": key, "data": data} for key, data in series.items()]

    dates_res = {"start_date": dates[0], "end_date": dates[-1]} if dates else \
        {"start_date": startDate, "end_date": endDate}

    return JsonResponse({"series": series, **dates_res})
