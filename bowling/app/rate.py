# Класс для тарифов

from app.utils import *
from app.string import *

class Rate:
    def __init__(self, name, value = 0, id = None) -> None:
        self.name = name
        self.value = value
        self.id = id

    def rate__table(info): # таблица тарифов
        print(rate__caption)
    
        for index, rate in enumerate(info['rates']):
            print('#{0} - тариф {1}: {2} рублей за час игры.'.format(index + 1, rate.name, rate.value))

    def add__rate(info): # создание тарифа
        name = input__string(rate__name) # имя
        value = input__int(rate__value, 1, 999) # стоимость
        id = len(info['rates']) # генерация его id

        new = Rate(name, value, id) # создание объекта
        info['rates'].append(new) # автодобавление в список тарифов
        return new # запасной вывод

    def choose__rate(info): # выбор тарифа
        Rate.rate__table(info) # список тарифов
        id = input__int(rate__id, 1, len(info['rates'])) - 1 # ввод номера тарифа в списке (id = номер - 1)

        for rate in info['rates']: # перебор тарифов
            if rate.id == id: # если id совпадают
                return rate # это он (вернуть)

    def change__rate(info): # изменение тарифа
        rate = Rate.choose__rate(info) # выбор тарифа
        print('\nСтарое имя тарифа: {}'.format(rate.name))
        rate.name = input__string(rate__name)
        print('\nСтарая стоимость тарифа: {}'.format(rate.value))
        rate.value = input__string(rate__value)

    def club__profit(info): # вывод заработанных денег за указанный день
        date = input__date(date__profit) # вывод даты
        sum = 0

        for session in info['sessions']: # перебор сеансов
            if convert__date(date) == convert__date(session.date): # если в эту дату
                for rate in info['rates']: # перебор тарифов
                    if rate.id == session.rate__id: # если сессия была по данному тарифу
                        cost = rate.value # извлечь стоимость тарифа

                sum += int(cost * session.hours) # прибавление к сумме результата

        print('Прибыль боулинг-клуба {0} составила {1} рублей.'.format(date, sum)) # вывод итога