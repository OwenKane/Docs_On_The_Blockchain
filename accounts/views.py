from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
# Create your views here.


def signup(request):
    if request.method == 'POST':
        # See if confirmation of password was correct
        if request.POST['password1'] == request.POST['password2']:
            # Check to see if the given username is available
            try:
                User.objects.get(username=request.POST['username'])
                return render(request, 'accounts/signup.html', {'error': 'User name has been taken'})
            except User.DoesNotExist:
                # Create new user object with info posted over from the template
                user = User.objects.create_user(request.POST['username'],
                                                password=request.POST['password1'],
                                                email=request.POST['email'],
                                                first_name=request.POST['fname'],
                                                last_name=request.POST['lname'])
                auth.login(request, user)  # Log the new user in
                return redirect('home')
        else:
            return render(request, 'accounts/signup.html', {'error': 'Passwords didn\'t match'})
    else:
        return render(request, 'accounts/signup.html')


def login(request):
    if request.method == 'POST':
        # Use Django secure authenticate to verify the user
        user = auth.authenticate(username=request.POST['username'], password=request.POST['password1'])
        if user is not None:
            auth.login(request, user)
            # If the user was redirect here from somewhere else, redirect them to the page
            if 'next' in request.POST:
                return redirect(request.POST['next'])
            return redirect('home')
        else:
            return render(request, 'accounts/login.html', {'error': 'Username and password didn\'t match'})
    else:
        return render(request, 'accounts/login.html')


def logout(request):
    print("!!!!!!!!!!!!!!!!!!!!")
    if request.method == 'POST':
        auth.logout(request)
        return redirect('home')
