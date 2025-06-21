# MODULE: Класс для подсчета среднего балла

from app.subject import Subject

from app.lib import *
from app.string import *

# Здесь data = dataPython 

class Average:
    def average_mark(data, pupil, subject): # функция для расчета среднего балла ученика по предмету
        sum = i = rez = 0

        for mark in data['marks']: # перебор всех оценок
            if mark.subject_id == subject.id and mark.pupil_id == pupil.id:
                sum += mark.value
                i += 1

        if sum > 0 and i > 0:
            rez = sum / i # расчет среднего арифметического
        return rez

    def average_mark_interval(data, subject): # расчет среднего балла во временном интервале
        start = enter_date(date_start) # дата начала интервала
        end = enter_date(date_end) # дата конца интервала
        list_marked = [] # список для аттестованных
        list_nomarked = [] # список для неаттестованных

        for pupil in data['pupils']: # перебор учеников
            sum = 0
            i = 0

            for mark in data['marks']: # перебор оценок
                if convert_date(start) <= convert_date(mark.date) <= convert_date(end): # если в интервале
                    if mark.subject_id == subject.id and mark.pupil_id == pupil.id:
                        sum += mark.value
                        i += 1

            if sum > 0 and i > 0:
                rez = sum / i # посчитать средний балл
                list_marked.append([pupil.name, pupil.surname, rez]) # и добавить инфу в список аттестованных
            else:
                list_nomarked.append([pupil.name, pupil.surname]) # в список неаттестованных
        
        return [list_marked, list_nomarked] # возвращает список из 2 списков (аттест и неаттест)

    def average_mark_subject(data): # функция для показа списка средних баллов учеников по предмету
        subject = Subject.choose_subject(data) # выбор предмета
        print('\nСредний балл учащихся по предмету {}:\n'.format(subject.name))

        for pupil in data['pupils']: # перебор учеников
            print('{0} {1}: {2}.'
            .format(pupil.name, pupil.surname, Average.average_mark(data, pupil, subject)))

    def average_mark_larger(data): # показ списка учеников со средним баллом выше заданного
        subject = Subject.choose_subject(data) # выбор предмета
        value = enter_int(mark_user, 0, 9) # ввод значения, с которым сравнивается
        print('\nСписок учащихся, у которых средний балл по предмету {0} выше {1}:\n'.format(subject.name, value))
        i = 0

        for pupil in data['pupils']: # перебор учеников
            average = Average.average_mark(data, pupil, subject) # расчет среднего балла

            if average > float(value): # если больше заданного значения
                i += 1
                print('#{0} - {1} {2} (средний балл {3}).'.format(i, pupil.name, pupil.surname, average))

    def average_total(data): # суммарный средний балл по всем предметам за все время
        for pupil in data['pupils']: # перебор учеников
            sum = 0.0
            i = 0
            rez = 0

            for subject in data['subjects']: # перебор предметов
                i += 1
                sum += Average.average_mark(data, pupil, subject) # суммирование средних баллов по предметам

            if sum > 0 and i > 0:
                rez = sum / i # суммарный средний балл

            print('Учащийся {0} {1}: суммарный средний балл по всем предметам {2}.'
            .format(pupil.name, pupil.surname, rez))