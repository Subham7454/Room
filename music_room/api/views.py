from django.shortcuts import render
from rest_framework import generics,status
from .models import Room
from .serializers import RoomSerializer,CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response



# Create your views here.

class RoomView(generics.ListAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer
    
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    
    def post(self, request, format=None):
        # Create a session if it doesn't exist
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        # Deserialize the request data
        serializer = self.serializer_class(data=request.data)
        
        # Check if data is valid
        if serializer.is_valid():
            guest_can_play = serializer.validated_data.get('guest_can_play')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = self.request.session.session_key
            
            # Check if the room already exists for the current host
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_play = guest_can_play
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_play', 'votes_to_skip'])
            else:
                # Create a new room if not found
                room = Room(host=host, guest_can_play=guest_can_play, votes_to_skip=votes_to_skip)
                room.save()
            
            # Return the room data in the response
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED) 
        
        # Return an error response if data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
