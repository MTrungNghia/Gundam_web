from rest_framework.views import exception_handler


def status_code_handler(exc, context):
    reponse = exception_handler(exc, context)

    if (reponse is not None and reponse.status_code == 403):
        reponse.status_code = 401

    return reponse
