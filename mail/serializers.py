from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Email


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model= User
        fields = ['id', 'username', 'email']


class UserWithTokenSerializer(serializers.ModelSerializer):
    pass



class EmailSerializer(serializers.ModelSerializer):
   

    recipientsList = serializers.ListField(source='getRecipientsEmails')
    timestamp = serializers.DateTimeField( format="%b %d %Y, %I:%M %p")
    class Meta:
        model = Email
        fields = ['sender', 'recipientsList', 'subject', 'body', 'timestamp', 'read', 'archived']