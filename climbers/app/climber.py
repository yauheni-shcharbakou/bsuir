class Climber:

    def __init__(self, name, address, group = None):
        self.name = name
        self.address = address
        self.group = group

    def climbers_table(list):
        for index, climber in enumerate(list):
            print('#{0} - {1}, адрес: {2}, участник группы {3}.'
            .format(index + 1, climber.name, climber.address, climber.group))

    def climber_ascents(climbers_list, mountains_list, ascents_list):
        no = int(input('\nВведите номер альпиниста, информация о котором интересует: \n'))
        error = True

        for index, climber in enumerate(climbers_list):
            if index + 1 == no:
                error = False
                
                for idx, mountain in enumerate(mountains_list):
                    value = 0
                    for ascent in ascents_list:
                        if mountain.name == ascent.mountain and climber.group == ascent.group:
                            value += 1
                    print('#{0} - Гора {1}: {2} восхожд.'.format(idx + 1, mountain.name, value))
        
        if error == True:
            print('\nОШИБКА: введен неверный номер\n')

    def create_climber():
        name = input('Введите имя нового альпиниста: ')
        address = input('Введите адрес альпиниста: ')
        
        climber = Climber(name, address)
        return climber

    def choose_climber(list):
        no = int(input('Введите номер альпиниста: \n'))
        error = True
        rez = None

        for index, climber in enumerate(list):
            if index + 1 == no:
                error = False
                rez = climber

        if error == True:
            print('ОШИБКА: указанного альпиниста не существует.\n')

        return rez