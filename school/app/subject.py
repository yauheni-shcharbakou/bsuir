# MODULE: Класс для дисциплин

from app.lib import *
from app.string import *

# Здесь data = dataPython 

class Subject:
    def __init__(self, name, id = None) -> None: # конструктор объекта
        self.name = name
        self.id = id

    def subject_list(data): # список предметов
        print(subject_header)
        
        for index, subject in enumerate(data['subjects']):
            print('#{0} - {1}.'.format(index + 1, subject.name))

    def choose_subject(data): # выбор предмета
        Subject.subject_list(data) # список предметов
        id = enter_int(subject_id, 1, len(data['subjects'])) - 1 # ввод номера в списке (id = номер - 1)

        for subject in data['subjects']: # перебор предметов
            if subject.id == id: # если id совпадают
                return subject # то это он

    def create_subject(data): # создание предмета
        name = enter(subject_name) # имя
        id = len(data['subjects']) # генерация id

        new = Subject(name, id) # создание объекта
        data['subjects'].append(new) # добавление в список предметов
        return new # запасной вывод

    def change_subject(data): # изменение предмета
        subject = Subject.choose_subject(data) # выбор предмета

        print('\nСтарое имя дисциплины: {}'.format(subject.name))
        subject.name = enter(subject_name)