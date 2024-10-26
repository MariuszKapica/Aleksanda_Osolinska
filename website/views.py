from django.shortcuts import render, redirect
from .forms import ContactForm
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.core.mail import send_mail
from django.conf import settings


def home(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = 'Otuleni miłością - nowe zgłoszenie'
            name = form.cleaned_data['Name']
            email = form.cleaned_data['Email']
            message = form.cleaned_data['Message']
            phone = form.cleaned_data['Phone']
            message_body = f"""Otrzymano zgłoszenie od {name} z adresu e-mail {email}.\nNumer telefonu podany w zgłoszeniu: {phone}.\n \nTreść zgłoszenia:\n{message}
            """
            send_mail(subject=subject, message=message_body, from_email=settings.EMAIL_HOST_USER,
                      recipient_list=[settings.NOTIFY_EMAIL], fail_silently=False)
            return render(request, 'website/kontakt_success.html', {})
    else:
        form = ContactForm()
    return render(request, 'website/base.html', {'form': form})

def about(request):
    return render(request, 'website/about.html', {})

def certyfikaty(request):
    return render(request, 'website/certyfikaty.html', {})

def oferta(request):
    return render(request, 'website/oferta.html', {})

def pytania(request):
    return render(request, 'website/pytania.html', {})

def kontakt_success(request):
    return render(request, 'website/kontakt_success.html', {})


def kontakt(request):
        if request.method == 'POST':
            form = ContactForm(request.POST)
            if form.is_valid():
                subject = 'Otuleni miłością - nowe zgłoszenie'
                name = form.cleaned_data['Name']
                email = form.cleaned_data['Email']
                message = form.cleaned_data['Message']
                phone = form.cleaned_data['Phone']
                message_body = f"""Otrzymano zgłoszenie od {name} z adresu e-mail {email}.\nNumer telefonu podany w zgłoszeniu: {phone}.\n \nTreść zgłoszenia:\n{message}
                """
                send_mail(subject=subject, message=message_body, from_email= settings.EMAIL_HOST_USER, recipient_list= [settings.NOTIFY_EMAIL], fail_silently=False)
                return render(request, 'website/kontakt_success.html',{})
        else:
            form = ContactForm()
        return render(request, 'website/kontakt.html', {'form': form})

