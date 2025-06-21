from app.date import Date
from app.group import Group

class Ascent:

    def __init__(self, group, date_start, date_end, mountain):
        self.group = group
        self.date_start = date_start
        self.date_end = date_end
        self.mountain = mountain

    def ascents_table(list):
        for index, ascent in enumerate(list):
            print('#{0} - восхождение группы {1}, гора: {2}, даты восхождения: {3} - {4}.'
            .format(index + 1, ascent.group, ascent.mountain, ascent.date_start, ascent.date_end))

    def all_ascents_in_interval(ascents_list, climbers_list):
        int_start = input('Введите дату начала интервала в формате ДД.ММ.ГГГГ: ')
        int_end = input('Введите дату начала интервала в формате ДД.ММ.ГГГГ: ')

        converted_start = Date.convert_date(int_start)
        converted_end = Date.convert_date(int_end)

        i = 0
        print('')

        for ascent in ascents_list:
            start = Date.convert_date(ascent.date_start)
            end = Date.convert_date(ascent.date_end)

            if (converted_start <= start <= converted_end) and (converted_start <= end <= converted_end):
                for climber in climbers_list:
                    if climber.group == ascent.group:
                        i += 1
                        print('#{0} - {1}, группа: {2}, гора: {3}, даты восхождения: {4} - {5}.'
                        .format(i, climber.name, ascent.group, ascent.mountain, ascent.date_start, ascent.date_end))

    def group_name(list):
        name = input('Введите название восходившей группы: ')
        new = True

        for group in list:
            if group.name == name:
                new = False

        if new == True:
            print('Группы не существует. Перенаправление на создание группы...')
            list.append(Group.create_group())

        return name

    def create_ascent(ascents_list, groups_list):
        group = Ascent.group_name(groups_list)

        mountain = input('Введите название вершины: ')
        date_start = input('Введите дату начала восхождения в формате ДД.ММ.ГГГГ: ')
        date_end = input('Введите дату конца восхождения в формате ДД.ММ.ГГГГ: ')

        ascent = Ascent(group, date_start, date_end, mountain)
        ascents_list.append(ascent)

    def change_ascent(groups_list, ascents_list):
        current_ascent = None

        while True:
            no = input('Введите номер изменяемого восхождения: ')
            error = True

            for index, ascent in enumerate(ascents_list):
                if index + 1 == int(no):
                    error = False
                    current_ascent = ascent

            if error == True:
                print('ОШИБКА: указанного восхождения не существует.\n')
                continue
            else:
                break

        group = Ascent.group_name(groups_list)
        current_ascent.group = group
        current_ascent.mountain = input('Введите название вершины: ')
        current_ascent.date_start = input('Введите дату начала восхождения в формате ДД.ММ.ГГГГ: ')
        current_ascent.date_end = input('Введите дату конца восхождения в формате ДД.ММ.ГГГГ: ')