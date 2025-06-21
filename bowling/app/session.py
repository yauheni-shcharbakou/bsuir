# Класс для сеансов игры

from app.rate import Rate
from app.track import Track
from app.player import Player

from app.utils import *
from app.string import *

class Session:
    def __init__(self, payment, date, hours, rate__id, track__id, players = [], rezult = [], id = None) -> None:
        # конструктор объекта
        self.payment = payment
        self.date = date
        self.hours = hours
        self.rate__id = rate__id
        self.track__id = track__id
        self.players = players
        self.rezult = rezult
        self.id = id

    def session__table(info): # таблица сеансов
        print(session__caption)
    
        for index, session in enumerate(info['sessions']): # перебор сеансов
            for rate in info['rates']: # перебор тарифов
                if rate.id == session.rate__id: # если сессия была по данному тарифу
                    current__rate = rate.name # извлечь имя тарифа

            for track in info['tracks']: # перебор дорожек
                if track.id == session.track__id: # если сеанс был на дорожке
                    current__track = track.name # извлечь имя дорожки

            print('#{0} - {1}: {2} часов игры, способ оплаты: {3}, тариф: {4}, дорожка {5}.'
            .format(index + 1, session.date, session.hours, session.payment, current__rate, current__track))

    def add__session(info): # добавление сеанса
        payment = input__string(session__payment)  # способ оплаты
        date = input__date(session__date)  # дата сеанса
        hours = input__int(session__hours, 0, 24)  # длительность сеанса в часах
        rate__id = Rate.choose__rate(info).id  # id тарифа
        track__id = Track.choose__track(info).id  # id дорожки
        players__info = Player.add__players__to__session(info)
        id = len(info['sessions'])  # генерация id сеанса

        new = Session(payment, date, hours, rate__id, track__id, players__info['players'], 
        players__info['rezult'], id)  # объект
        info['sessions'].append(new)  # добавление объекта в список сеансов
        return new  # запасной вывод

    def choose__session(info): # выбор сеанса игры
        Session.session__table(info) # таблица сеансов
        id = input__int(session__id, 0, len(info['sessions'])) - 1 # ввод номера сеанса в таблице

        for session in info['sessions']: # перебор всех сеансов
            if session.id == id: # если id совпадают
                return session # то це он (вернуть)

    def change__session(info): # изменение сеанса игры
        session = Session.choose__session(info) # выбор ученика

        a = input(session__change__payment) # изменение способа оплаты
        if int(a) == 1:
            print('\nСтарый способ оплаты: {}'.format(session.payment))
            session.payment = input__string(session__payment)

        a = input(session__change__date) # изменение даты игры
        if int(a) == 1:
            print('\nСтарая дата: {}'.format(session.date))
            session.date = input__date(session__date)

        a = input(session__change__hours) # изменение длительности
        if int(a) == 1:
            print('\nСтарое время сеанса в часах: {}'.format(session.hours))
            session.hours = input__int(session__hours, 0, 24)

        a = input(session__change__rate) # изменение тарифа
        if int(a) == 1:
            for rate in info['rates']: # перебор тарифов
                if rate.id == session.rate__id: # если id совпадают
                    rate__name = rate.name # извлечь инфу
                    rate__value = rate.value

            print('\nСтарый тариф: {0}, {1} рублей за час игры.'.format(rate__name, rate__value))
            session.rate__id = Rate.choose__rate(info).id # присвоить id нового тарифа

        a = input(session__change__track) # изменение дорожки
        if int(a) == 1:
            for track in info['tracks']: # перебор дорожек
                if track.id == session.track__id: # если id совпадают
                    track__name = track.name # извлечь инфу

            print('\nСтарая дорожка: {}'.format(track__name))
            session.track__id = Track.choose__track(info).id # присвоить id новой дорожки

        a = input(session__change__players) # изменение игроков/результатов
        if int(a) == 1:
            session.players = session.rezult = [] # очистка списка игроков и результатов
            new__session__rezults = Player.add__players__to__session(info) # добавление игроков и рез
            session.players = new__session__rezults['players'] # присвоить куда надо
            session.rezult = new__session__rezults['rezult']

    def sessions__in__interval(info): # показ всех сессий, прошедших в пользовательский интервал
        start = input__date(date__start) # дата начала интервала
        end = input__date(date__end) # дата конца интервала
        print()

        for session in info['sessions']: # перебор сеансов
            if convert__date(start) <= convert__date(session.date) <= convert__date(end): # если в интервале
                for rate in info['rates']: # перебор тарифов
                    if rate.id == session.rate__id: # если сессия была по данному тарифу
                        current__rate = rate.name # извлечь имя тарифа

                for track in info['tracks']: # перебор дорожек
                    if track.id == session.track__id: # если сеанс был на дорожке
                        current__track = track.name # извлечь имя дорожки

                print('{0}: {1} часов игры, способ оплаты: {2}, тариф: {3}, дорожка {4}.'
                .format(session.date, session.hours, session.payment, current__rate, current__track))

    def get__players(session, info):
        players = [] # массив с игроками
        i = 0

        for player__id in session.players: # перебор игроков данной сессии
            for player in info['players']: # поиск сессионного игрока в списке игроков
                if player__id == player.id and i < len(session.players): # если он
                    players.append(player) # извлечь его и впихнуть в массив с игроками
                    i += 1

        return players

    def rezults__in__session(info): # показ результатов каждого игрока в выбранном сеансе
        session = Session.choose__session(info) # выбор сеанса
        players = Session.get__players(session, info)
        i = 0

        for index, current__player in enumerate(players): # для каждого из игроков в массиве с игроками
            print('{0} - Игрок {1}, результат: {2}.'.format(index, current__player.name, session.rezult[i]))
            i += 1

    def summary__rezult__in__session(info): # суммарный результат всех участников выбранного сеанса
        session = Session.choose__session(info) # выбор сеанса
        sum = 0

        for item in session.rezult: # суммирование результатов игроков
            sum += item

        print('Суммарный счет всех участников сеанса, прошедшего {0}: {1}.'.format(session.date, sum))

    def summary__rezult__in__all(info): # суммарный счет игроков-участников выбр сеанса з все игры
        session = Session.choose__session(info) # выбор сеанса
        players = Session.get__players(session, info) # извлечение игроков

        for player in players: # перебор участников
            sum = 0 # сумма очков

            for session in info['sessions']: # перебор всех сеансов
                i = 0 # порядковый счетчик

                for member in session.players: # перебор участников сеанса
                    if member == player.id: # если он
                        sum += session.rezult[i] # добавление результата игры

                    i += 1
            
            print('Счет игрока {0} за все игры: {1}.'.format(player.name, sum)) # вывод итога