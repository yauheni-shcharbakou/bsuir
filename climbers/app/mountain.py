class Mountain:

    def __init__(self, name, height = 0, region = None, country = None, number_climbers = 0):
        self.name = name
        self.height = height
        self.region = region
        self.country = country
        self.number_climbers = number_climbers

    def count_climbers(mountains_list, ascents_list, groups_list):
        for mountain in mountains_list:
            value = set()
            for ascent in ascents_list:
                if ascent.mountain == mountain.name:
                    for group in groups_list:
                        if group.name == ascent.group:
                            for member in group.members:
                                value.add(member)
            mountain.number_climbers = len(value)

    def mountains_table(list):
        for index, item in enumerate(list):
            print('#{0} - Название: {1}, высота: {2} м, регион: {3}, страна: {4}, количество взобравшихся: {5}.'
            .format(index + 1, item.name, item.height, item.region, item.country, item.number_climbers))

    def mountains_list(list):
        print('Список существующих гор:')
        for index, item in enumerate(list):
            print('#{0} - гора {1}.'.format(index + 1, item.name))

    def create_mountain(list):
        name = input('\nВведите название новой горы: ')
        height = int(input('Введите ее высоту: '))
        region = input('Введите регион, в котором расположена гора: ')
        country = input('Введите страну, в которой расположена гора: ')
        mountain = Mountain(name, height, region, country)
        list.append(mountain)

    def change_mountain(list):
        error = False
        required_mountain = input('\nВведите имя изменяемой вершины: ')

        for mountain in list:
            if mountain.name == required_mountain:
                print('Изменение данных о вершине {}.'.format(mountain.name))
                mountain.name = input('Введите новое название вершины: ')
                mountain.height = int(input('Введите ее высоту: '))
                mountain.region = input('Введите регион, в котором расположена гора: ')
                mountain.country = input('Введите страну, в которой расположена гора: ')
            else:
                error = True

        if error == True:
            print('\nОШИБКА: такой вершины не существует.')