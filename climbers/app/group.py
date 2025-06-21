from app.climber import Climber

class Group:

    def __init__(self, name, members = []):
        self.name = name
        self.members = members

    def groups_table(list):
        for index, group in enumerate(list):
            a = []
            for member in group.members:
                b = member.name
                a.append(b)
            members = ', '.join(a)
            print('#{0} - группа {1}, участники: {2}.'.format(index + 1, group.name, members))

    def create_group():
        name = input('Введите имя новой группы: ')
        new_group = Group(name)
        return new_group

    def add_climber_to_group(climber, list):
        user_group = input('Введите имя группы: ')
        error = True

        for group in list:
            if group.name == user_group:
                group.members.append(climber)
                climber.group = group.name
                error = False
        
        if error == True:
            print('ОШИБКА: указанная группа не существует.\n')

    def choose_group(list):
        name = input('Введите имя группы: \n')
        error = True
        rez = None

        for group in list:
            if group.name == name:
                rez = group
                error = False

        if error == True:
            print('ОШИБКА: указанной группы не существует.\n')

        return rez
                

    def add_climber_to_current_group(climber, group):
        group.members.append(climber)
        climber.group = group.name

    def change_group(group_list, climber_list):
        name = input('Введите имя группы, которую хотите изменить: ')
        error = True

        for group in group_list:
            if group.name == name:
                print('Изменение группы {0}.\n'.format(group.name))
                error = False
                new_name = input('Введите новое имя группы :')

                if new_name != None:
                    group.name = new_name

                a = input('Изменить участников группы?\n\n1. Да\n2. Нет\n')

                if int(a) == 1:
                    group.members = []

                    while True:
                        error2 = True
                        Climber.climbers_table(climber_list)

                        no = int(input('Введите номер альпиниста: '))

                        for index, climber in enumerate(climber_list):
                            if index + 1 == no:
                                error2 = False
                                group.members.append(climber)
                                climber.group = group.name

                        if error2 == True:
                            print('ОШИБКА: указанного альпиниста не существует.\n')

                        b = input('Добавить еще одного?\n\n1. Да\n2. Нет\n')

                        if int(b) == 1:
                            continue
                        else: 
                            break
        if error == True:
            print('ОШИБКА: указанной группы не существует.\n')