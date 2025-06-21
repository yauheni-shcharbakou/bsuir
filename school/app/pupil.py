# MODULE: Класс для учеников

from app.lib import *
from app.string import *

# Здесь data = dataPython 

class Pupil:
    def __init__(self, name, surname, address, id = None) -> None: # конструктор объекта
        self.name = name
        self.surname = surname
        self.address = address
        self.id = id

    def pupil_list(data): # список учеников
        print(pupil_header)
        
        for index, pupil in enumerate(data['pupils']):
            print('#{0} - учащийся {1} {2}, адрес: {3}.'
            .format(index + 1, pupil.name, pupil.surname, pupil.address))

    def create_pupil(data): # создание ученика
        name = enter(pupil_name) # имя
        surname = enter(pupil_surname) # фамилия
        address = enter(pupil_address) # адрес
        id = len(data['pupils']) # генерация его id

        new = Pupil(name, surname, address, id) # создание объекта
        data['pupils'].append(new) # автодобавление в список учеников
        return new # запасной вывод

    def choose_pupil(data): # выбор ученика
        Pupil.pupil_list(data) # список учеников
        id = enter_int(pupil_id, 1, len(data['pupils'])) - 1 # ввод номера ученика в списке (id = номер - 1)

        for pupil in data['pupils']: # перебор учеников
            if pupil.id == id: # если id совпадают
                return pupil # это он

    def change_pupil(data): # изменение ученика
        pupil = Pupil.choose_pupil(data) # выбор ученика

        a = input(pupil_change_name)
        if int(a) == 1:
            print('\nСтарое имя: {}'.format(pupil.name))
            pupil.name = enter(pupil_name)

        a = input(pupil_change_surname)
        if int(a) == 1:
            print('\nСтарая фамилия: {}'.format(pupil.surname))
            pupil.surname = enter(pupil_surname)

        a = input(pupil_change_address)
        if int(a) == 1:
            print('\nСтарый адрес: {}'.format(pupil.address))
            pupil.address = enter(pupil_address)