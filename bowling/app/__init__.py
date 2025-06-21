# Основной каркас программы

from app.player import Player
from app.rate import Rate
from app.track import Track
from app.session import Session
from app.file import File

from app.utils import *
from app.make import *
from app.string import *
from app.default import default__info

# данные программы (дефолт/из файла)
info = make__python(File.read(file__path, file__name, default__info))

# BLOCK: Инструкции для интерфейсов

def add_player():
    caption(caption__1__1)
    Player.add__player(info)
    File.write(file__path, file__name, make__json(info))

def change_player():
    caption(caption__1__2)
    Player.change__player(info)
    File.write(file__path, file__name, make__json(info))

def add_session():
    caption(caption__2__1)
    Session.add__session(info)
    File.write(file__path, file__name, make__json(info))

def current_rate_in_interval():
    caption(caption__2__2)
    Session.sessions__in__interval(info)

def rezults_in_session():
    caption(caption__2__3)
    Session.rezults__in__session(info)

def summary_rezult_in_session():
    caption(caption__2__4)
    Session.summary__rezult__in__session(info)

def summary_rezult_in_all():
    caption(caption__2__5)
    Session.summary__rezult__in__all(info)

def add_rate():
    caption(caption__3__1)
    Rate.add__rate(info)
    File.write(file__path, file__name, make__json(info))

def change_rate():
    caption(caption__3__2)
    Rate.change__rate(info)
    File.write(file__path, file__name, make__json(info))

def club_profit():
    caption(caption__3__3)
    Rate.club__profit(info)

def add_track():
    caption(caption__4__1)
    Track.add__track(info)
    File.write(file__path, file__name, make__json(info))

def change_track():
    caption(caption__4__2)
    Track.change__track(info)
    File.write(file__path, file__name, make__json(info))

# Сама прога

caption(app__info)

while True:
    caption(init__menu)
    a = input()

    if int(a) == 1:
        while True:
            caption(caption__1)
            Player.player__list(info)

            b = input(menu__1)

            if int(b) == 1:
                loop(add_player, menu__1__1)
            elif int(b) == 2:
                loop(change_player, menu__1__2)
            else:
                break
    elif int(a) == 2:
        while True:
            caption(caption__2)
            Session.session__table(info)

            b = input(menu__2)

            if int(b) == 1:
                loop(add_session, menu__2__1)
            elif int(b) == 2:
                loop(current_rate_in_interval, menu__2__2)
            elif int(b) == 3:
                loop(rezults_in_session, menu__2__3)
            elif int(b) == 4:
                loop(summary_rezult_in_session, menu__2__3)
            elif int(b) == 5:
                loop(summary_rezult_in_all, menu__2__3)
            else:
                break
    elif int(a) == 3:
        while True:
            caption(caption__3)
            Rate.rate__table(info)

            b = input(menu__3)

            if int(b) == 1:
                loop(add_rate, menu__3__1)
            elif int(b) == 2:
                loop(change_rate, menu__3__2)
            elif int(b) == 3:
                loop(club_profit, menu__3__3)
            else:
                break
    elif int(a) == 4:
        while True:
            caption(caption__4)
            Track.track__list(info)

            b = input(menu__4)

            if int(b) == 1:
                loop(add_track, menu__4__1)
            elif int(b) == 2:
                loop(change_track, menu__4__2)
            else:
                break
    else:
        break