# MODULE: Методы для работы с файлом

import json
import os.path

from app.pupil import Pupil
from app.mark import Mark
from app.subject import Subject

class File:
    def read(path, name, default): # фуункция для чтения данных из файла
        dataJson = None

        if os.path.isfile(path): # если файл существует
            with open(name, 'r') as f: # открыть
                dataJson = json.loads(f.read()) # и прочитать (попутно сконвертировав в json-строку)
        else: # если нет файла
            dataJson = json.loads(json.dumps(default, ensure_ascii = False)) # загрузить и сконвертить дефолт даные
            with open(name, 'w+') as f: # создать и записать дефолтные данные в файл
                f.write(json.dumps(default, ensure_ascii = False, indent = 4))

        return dataJson # данные в json-формате

    def write(path, name, dataJson): # функция для записи данных в файл
        if os.path.isfile(path): # если файл существует
            with open(name, 'w+') as f: # открыть и очистить
                f.seek(0)
                f.close()
        
        with open(name, 'w+') as f: # снова открыть
            f.write(json.dumps(dataJson, ensure_ascii = False, indent = 4)) # записать данные

    def build_pupils(dataPython): # преобразование инфы об учениках из питоновского в json-формат
        pupilsJson = []
        
        for pupil in dataPython['pupils']: # перебор учеников
            pupilsJson.append({ # каждый ученик - словарь
                'name':     pupil.name,
                'surname':  pupil.surname,
                'address':  pupil.address,
                'id':       pupil.id
            }) # добавить словарь в итоговый лист
        
        return pupilsJson # лист учеников в json

    def build_marks(dataPython): # преобразование инфы об оценках из питоновского в json-формат
        marksJson = []

        for mark in  dataPython['marks']: # перебор оценок
            marksJson.append({ # каждая оценка - словарь
                'value':        mark.value,
                'subject_id':   mark.subject_id,
                'pupil_id':     mark.pupil_id,
                'date':         mark.date,
                'id':           mark.id
            }) # добавить словарь в итоговый лист
        
        return marksJson # лист оценок в json

    def build_subjects(dataPython): # преобразование инфы о предметах из питоновского в json-формат
        subjectsJson = []

        for subject in dataPython['subjects']: # перебор предметов
            subjectsJson.append({ # каждый предмет - словарь
                'name': subject.name,
                'id':   subject.id
            }) # добавить словарь в итоговый лист

        return subjectsJson # лист предметов в json

    def build(dataPython): # сборка полного файла json
        return { # dataJson
            'pupils':   File.build_pupils(dataPython),
            'marks':    File.build_marks(dataPython),
            'subjects': File.build_subjects(dataPython)
        }

    def load(dataJson): # Преобразование json-строки данных в питон-формат
        pupils = []
        for pupil in dataJson['pupils']:
            pupils.append(Pupil(pupil['name'], pupil['surname'], pupil['address'], int(pupil['id'])))

        marks = []
        for mark in dataJson['marks']:
            marks.append(Mark(int(mark['value']), int(mark['subject_id']), int(mark['pupil_id']), 
            mark['date'], int(mark['id'])))

        subjects = []
        for subject in dataJson['subjects']:
            subjects.append(Subject(subject['name'], int(subject['id'])))

        return { # dataPython
            'pupils': pupils, 
            'marks': marks,
            'subjects': subjects
        }