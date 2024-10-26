from django import forms
from django.core.validators import EmailValidator
from phonenumber_field.formfields import PhoneNumberField

class ContactForm(forms.Form):
    Name = forms.CharField(label="",widget=forms.TextInput(attrs={'placeholder': 'Twoje Imię'}), required=True)
    Phone = PhoneNumberField(label="",widget=forms.TextInput(attrs={'placeholder': 'Twój numer telefonu'}), required=True)
    Email = forms.CharField(label="", validators=[EmailValidator()], widget=forms.TextInput(attrs={'placeholder': 'Twój e-mail'}), required=True)
    Message = forms.CharField(label="", widget=forms.Textarea(attrs={'placeholder': 'Treść wiadomości'}), required=True)
    Phone.error_messages['invalid'] = 'Wprowadź poprawny numer telefonu (np. 123-456-789).'