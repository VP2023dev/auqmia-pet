from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


def api_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {
                'success': False,
                'error': 'Erro interno do servidor.',
                'details': str(exc),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(
        {
            'success': False,
            'error': 'Não foi possível processar a requisição.',
            'details': response.data,
        },
        status=response.status_code,
    )
