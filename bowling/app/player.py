# Класс для игроков

from app.utils import *
from app.string import *

class Player:
    def __init__(self, name, id = None) -> None: # конструктор объекта
        self.name = name
        self.id = id

    def player__list(info): # вывод списка игроков
        print(player__caption) # заголовок

        for index, player in enumerate(info['players']): # перебираем игроков
            print('#{0} - игрок {1}.'.format(index + 1, player.name)) # выводим строчку с инфой

    def add__player(info): # создание игрока
        name = input__string(player__name) # имя
        id = len(info['players']) # генерация его id

        new = Player(name, id) # создание объекта
        info['players'].append(new) # автодобавление в список учеников
        return new # запасной вывод

    def choose__player(info): # выбор игрока из списка
        Player.player__list(info) # список учеников
        id = input__int(player__id, 1, len(info['players'])) - 1 # ввод номера ученика в списке (id = номер - 1)

        for player in info['players']: # перебор учеников
            if player.id == id: # если id совпадают
                return player # это он (вернуть)

    def change__player(info): # изменение игрока
        player = Player.choose__player(info) # выбор ученика
        print('\nСтарое имя игрока: {}'.format(player.name)) # подсказка (старое имя)
        player.name = input__string(player__name) # смена имени игрока

    def add__players__to__session(info): # добавление игроков в сеанс
        players = rezult = [] # массивы с игроками и их результатами

        while True:
            player = Player.choose__player(info) # выбор игрока
            players.append(player.id) # добавление в нужный массив
            player__rezult = input__int('Результат игрока {}: '.format(player.name), 0, 300)
            rezult.append(player__rezult) # добавление результата игрока в массив

            a = input(menu__1__1)

            if int(a) == 1:
                continue
            else:
                return {'players': players, 'rezult': rezult}