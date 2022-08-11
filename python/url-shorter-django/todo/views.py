from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from .decorators import define_usage
from .models import UrlShort
from .serializers import taskSerializer
from django.shortcuts import redirect
import requests
from rest_framework import status

#URL /
@define_usage(returns={'url_usage': 'Dict'})
@api_view(['GET'])
def api_index(requet):
    details = {}
    for item in list(globals().items()):
        if item[0][0:4] == 'api_':
            if hasattr(item[1], 'usage'):
                details[reverse(item[1].__name__)] = item[1].usage
    return Response(details)



#URL /all
@define_usage(returns={'tasks': 'Dict'})
@api_view(['GET'])
def get_all_url(request):
    tasks = taskSerializer(UrlShort.objects.all(), many=True)
    return Response({'urls': tasks.data})


#URL /new
@define_usage(params={'url': 'String'},
              returns={'success': 'Bool'})

@api_view(['POST'])
def create_url(request):
    try:
        url = request.data.get('url')
        if url is None:
            return Response(data={'success': False, "error": 'your body not contain url'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            res = requests.get(url)
            if res.status_code > status.HTTP_307_TEMPORARY_REDIRECT:
                return Response(data={'success': False, "error": f'cant load the url you want to short'},
                                status=status.HTTP_400_BAD_REQUEST)

        except Exception as ex:
            return Response(data={'success': False, "error": f'cant load the url you want to short. error: {ex}'}, status=status.HTTP_400_BAD_REQUEST)


        obj = UrlShort(url=url)
        obj.save()
        return Response({'success': True, 'short_url': f's/{obj.id}'})

    except Exception as ex:
        return Response(data={'success': False, "error": str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#URL /s/<id>
@define_usage(params={'url_short': 'String' },
              returns={'success': 'Html'})
@api_view(['GET'])
def redirect_to_url(request, id):
    try:
        obj = UrlShort.objects.get(id=int(id)) if id.isdigit() else None
        if obj is None:
            return Response(data={'success': False, "error": 'url short not found'}, status=status.HTTP_404_NOT_FOUND)

        obj.count +=1
        obj.save()
        response = redirect(obj.url)
        return response

    except Exception as ex:
        return Response(data={'success': False, "error": str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



