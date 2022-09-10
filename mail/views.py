import json
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.response import Response
from .models import User, Email
from .serializers import EmailSerializer, SignupSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView





def index(request):
    return render(request, "index.html")


@api_view(['POST'])
def signup(request):
    
    serializer = SignupSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=201)
    else:
        data = serializer.errors
    return Response(data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@csrf_exempt
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def compose(request):

    # Composing a new email must be via POST
    if request.method != "POST":
        return Response({"error": "POST request required."}, status=400)

    # Check recipient emails
    data = json.loads(request.data)
    emails = [email.strip() for email in data.get("recipients").split(",")]
    if emails == [""]:
        return Response({
            "error": "At least one recipient required."
        }, status=400)

    # Convert email addresses to users
    recipients = []
    for email in emails:
        try:
            user = User.objects.get(email=email)
            recipients.append(user)
        except User.DoesNotExist:
            return Response({
                "error": f"User with email {email} does not exist."
            }, status=400)

    # Get contents of email
    subject = data.get("subject", "")
    body = data.get("body", "")
   
    # Create one email for each recipient, plus sender
    users = set()
    users.add(request.user)
    users.update(recipients)
    for user in users:
        email = Email(
            user=user,
            sender=request.user,
            subject=subject,
            body=body,
            read=user == request.user
        )
        email.save()
        for recipient in recipients:
            email.recipients.add(recipient)
        email.save()
    return Response({"message": "Email sent successfully."}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mailbox(request, mailbox):

    # Filter emails returned based on mailbox
    if mailbox == "inbox":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=False
        )
    elif mailbox == "sent":
        emails = Email.objects.filter(
            user=request.user, sender=request.user
        )
    elif mailbox == "archive":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=True
        )
    else:
        return Response({"error": "Invalid mailbox."}, status=400)

    # Return emails in reverse chronologial order
    emails = emails.order_by("-timestamp").all()
    return Response([EmailSerializer(email).data for email in emails])


@csrf_exempt
@permission_classes([IsAuthenticated])
@api_view(['GET','PUT'])
def email(request, email_id):

    # Query for requested email
    try:
        email = Email.objects.get(user=request.user, pk=email_id)
    except Email.DoesNotExist:
        return Response({"error": "Email not found."}, status=404)

    # Return email contents
    if request.method == "GET":
        return Response(EmailSerializer(email).data)

    # Update whether email is read or should be archived
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("read") is not None:
            email.read = data["read"]
        if data.get("archived") is not None:
            email.archived = data["archived"]
        email.save()
        return Response(status=204)

    # Email must be via GET or PUT
    else:
        return Response({
            "error": "GET or PUT request required."
        }, status=400)

