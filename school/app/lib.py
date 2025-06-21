# MODULE: Методы для оформления интерфейса

import datetime

from app.string import *

def header(text): # оформление шапки пунктов
    print('-' * 80) # полоска из тире
    print(text) # заголовок

def enter(text): # интерфейс для ввода строчного значения
    while True:
        rez = input(text)

        if not rez: # если пусто - ошибка
            print(error_empty)
            continue
        else:
            return rez

def enter_int(text, min = 0, max = 999): # интерфейс для ввода цифры int
    while True:
        rez = input(text)

        if not rez: # если пусто - ошибка
            print(error_empty)
            continue
        elif not rez.isdigit(): # если не цифра - ошибка
            print(error_nodigit)
            continue
        elif not min <= int(rez) <= max: # если выпадает из допустимого диапазона - ошибка
            print(error_wrong)
            continue
        else:
            return int(rez)

def enter_date(text = ''): # интерфейс для ввода даты
    print(text) # заголовок, если нужен
    
    while True:
        d = enter_int(date_day, 1, 31) # ввод дня
        m = enter_int(date_month, 1, 12) # ввод месяца
        y = enter_int(date_year, 2000, 2100) # ввод года

        try:
            datetime.date(y, m, d) # попытка сконвертировать в datetime, если не получится - выпадет в except (ошибка)
            return datetime.datetime(y, m, d).strftime('%d.%m.%Y') # dateStr (вернуть дату в строчном формате)
        except:
            print(error_nodate)
            continue

def convert_date(dateStr): # перобразователь строчной даты в объект datetime
    return datetime.datetime.strptime(dateStr, '%d.%m.%Y') # dateDatetime

def interfase(instruction, menu): # цикличный пункт меню
    while True:
        instruction() # какие-либо функции
        
        a = input(menu) # двойственный выбор - продолжить делать оное или же выйти

        if int(a) == 1:
            continue
        else:
            break