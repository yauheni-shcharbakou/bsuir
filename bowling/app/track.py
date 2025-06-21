# Класс для дорожек

from app.utils import *
from app.string import *

class Track:
    def __init__(self, name, id = None) -> None: # конструктор объекта
        self.name = name
        self.id = id

    def track__list(info): # список дорожек
        print(track__caption) # заголовок
        
        for index, track in enumerate(info['tracks']): # перебор дорожек
            print('#{0} - дорожка {1}.'.format(index + 1, track.name)) # строка с инфой

    def add__track(info): # создание новой дорожки
        name = input__string(track__name) # имя
        id = len(info['tracks']) # генерация id

        new = Track(name, id) # создание объекта
        info['tracks'].append(new) # добавление в список дорожек
        return new # запасной вывод

    def choose__track(info): # выбор дорожки
        Track.track__list(info) # список дорожек
        id = input__int(track__id, 1, len(info['tracks'])) - 1 # ввод номера в списке (id = номер - 1)

        for track in info['tracks']: # перебор дорожек
            if track.id == id: # если id совпадают
                return track # то это она (вернуть)

    def change__track(info): # изменение дорожки
        track = Track.choose__track(info) # выбор дорожки
        print('Старое имя дорожки: {}'.format(track.name))
        track.name = input__string(track__name)