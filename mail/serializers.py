from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Email, User
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model= User
        fields = ['id', 'username', 'email']


class SignupSerializer(serializers.ModelSerializer):

    confirmPassword = serializers.CharField(write_only=True)


    class Meta:
        model = User
       
        fields = ['username', 'password', 'confirmPassword']
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def save(self):
        user = User(username=self.validated_data['username'],
            email=self.validated_data['username']
        )
        confirmPassword = self.validated_data["confirmPassword"]
        password = self.validated_data['password']
        if password != confirmPassword:
            raise serializers.ValidationError({'password': 'password must match'})
        errors = validate_password(self.validated_data['password'])
        if errors is not None:
             raise serializers.ValidationError({'error': errors})
        user.set_password(self.validated_data['password'])
        user.save()

        return user



class EmailSerializer(serializers.ModelSerializer):
   
    recipientsList = serializers.ListField(source='getRecipientsEmails')
    timestamp = serializers.DateTimeField(format="%b %d %Y, %I:%M %p")
    sender = serializers.EmailField(source='sender.email')

    class Meta:
        model = Email
        fields = ['id' ,'sender', 'recipientsList', 'subject', 'body', 'timestamp', 'read', 'archived']