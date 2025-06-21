# Методы-утилиты

import datetime

from app.string import *

def caption(text): # оформление заголовка пунктов
    print('#' * 50) # полоска из тире
    print(text) # заголовок

def input__string(text): # метод для ввода строчного значения
    while True:
        rez = input(text)

        if not rez: # если пусто - ошибка
            print(error__empty)
            continue
        else:
            return rez

def input__int(text, min = 0, max = 999): # метод для ввода цифры int
    while True:
        rez = input(text)

        if not rez: # если пусто - ошибка
            print(error__empty)
            continue
        elif not rez.isdigit(): # если не цифра - ошибка
            print(error__no_digit)
            continue
        elif not min <= int(rez) <= max: # если выпадает из допустимого диапазона - ошибка
            print(error__wrong)
            continue
        else:
            return int(rez)

def input__date(text = ''): # метод для ввода даты
    print(text) # заголовок, если нужен
    
    while True:
        d = input__int(date__day, 1, 31) # ввод дня
        m = input__int(date__month, 1, 12) # ввод месяца
        y = input__int(date__year, 2020, 2030) # ввод года

        try:
            return datetime.datetime(y, m, d).strftime('%d.%m.%Y') # dateStr (вернуть дату в строчном формате)
        except:
            print(error__no_date)
            continue

def convert__date(dateStr): # перобразователь строчной даты в объект datetime
    return datetime.datetime.strptime(dateStr, '%d.%m.%Y') # dateDatetime

def loop(const, menu): # цикличный пункт меню
    while True:
        const() # какие-либо функции
        
        a = input(menu) # двойственный выбор - продолжить делать оное или же выйти

        if int(a) == 1:
            continue
        else:
            break