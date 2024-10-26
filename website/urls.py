from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("home/", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("certyfikaty/", views.certyfikaty, name="certyfikaty"),
    path("oferta/", views.oferta, name="oferta"),
    path("kontakt/", views.kontakt, name="kontakt"),
    path("pytania/", views.pytania, name="pytania"),
    path("kontakt_success/", views.kontakt_success, name="kontakt_success")
]