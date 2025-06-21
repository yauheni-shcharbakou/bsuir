# MODULE: Класс для оценок

import datetime

from app.subject import Subject
from app.pupil import Pupil
from app.average import Average

from app.lib import *
from app.string import *

# Здесь data = dataPython 

class Mark:
    def __init__(self, value, subject_id, pupil_id, date, id = None) -> None: # конструктор объекта
        self.value = value
        self.subject_id = subject_id
        self.pupil_id = pupil_id
        self.date = date
        self.id = id

    def create_mark(data): # создание оценки
        value = enter_int(mark_value, 0, 10) # значение
        subject_id = Subject.choose_subject(data).id # определение id предмета
        pupil_id = Pupil.choose_pupil(data).id # определение id ученика
        date = enter_date() # дата
        id = len(data['marks']) # генерация id оценки

        new = Mark(value, subject_id, pupil_id, date, id) # объект
        data['marks'].append(new) # добавление объекта в список оценок
        return new # запасной вывод

    def mark_chronology(data): # функция для показа оценок в хронол порядке
        pupil = Pupil.choose_pupil(data) # выбор ученика
        subject = Subject.choose_subject(data) # выбор предмета
        d = dict()

        for mark in data['marks']: # перебор оценок
            for subject_ in data['subjects']: # и предметов
                if mark.pupil_id == pupil.id and mark.subject_id == subject_.id: # если наши
                    d[mark.date] = mark.id # добавить в словарь
        
        sorted_d = sorted(d.items(), key = lambda x:datetime.datetime.strptime(x[0], '%d.%m.%Y'), reverse = False)
        # сортировка словаря в хронолог порядке
        print('\nОценки учащегося {0} {1} по предмету {2} в хронологическом порядке:\n'
        .format(pupil.name, pupil.surname, subject.name))

        for item in sorted_d: # последвательный вывод инфы из отсортированного словаря
            for mark in data['marks']:
                if mark.id == int(item[1]):
                    print('Дата: {0}, получена оценка {1}.'.format(item[0], mark.value))

    def mark_in_interval(data): # функция для показа оценок за интервал
        pupil = Pupil.choose_pupil(data) # выбор ученика
        start = enter_date(date_start) # начало интервала
        end = enter_date(date_end) # конец интервала
        d = dict()

        for mark in data['marks']: # перебор оценок
            if mark.pupil_id == pupil.id: # если оценки этого ученика
                if convert_date(start) <= convert_date(mark.date) <= convert_date(end): # и входят в диапазон
                    d[mark.date] = mark.id # добавить в словарь

        sorted_d = sorted(d.items(), key = lambda x:datetime.datetime.strptime(x[0], '%d.%m.%Y'), reverse = False)
        # сортировка словаря в хронолог порядке
        print('\nОценки учащегося {0} {1} в период с {2} по {3}:\n'
            .format(pupil.name, pupil.surname, start, end))

        for item in sorted_d: # последвательный вывод инфы из отсортированного словаря
            for mark in data['marks']:
                if mark.id == int(item[1]):
                    for subject in data['subjects']:
                        if subject.id == mark.subject_id:
                            print('Дата: {0}, получена оценка {1} по дисциплине {2}.'
                            .format(item[0], mark.value, subject.name))

    def marked_pupils(data): # функция для показа аттестованных учеников в течение интервала
        subject = Subject.choose_subject(data) # выбор предмета
        array = Average.average_mark_interval(data, subject) # расчет среднего балла во временном интервале

        print('\nСписок аттестованных учащихся по предмету {}:\n'.format(subject.name))
        for item in array[0]:
            print('Учащийся {0} {1}, средний балл по предмету: {2}.'.format(item[0], item[1], item[2]))
        
        print('\nСписок неаттестованных учащихся по предмету {}:\n'.format(subject.name))
        for item in array[1]:
            print('Учащийся {0} {1}.'.format(item[0], item[1]))