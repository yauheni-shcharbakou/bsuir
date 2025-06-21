# Сборка:
# pyinstaller -F main.py

from app.mountain import Mountain
from app.climber import Climber
from app.group import Group
from app.ui import Ui

from app.default import *
from app.string import *

from app.build import Build
from app.load import Load
from app.file import File

info_python = Load.load_all(File.read(file_path, file_name, default_json))

mountains = info_python[0]
climbers = info_python[1]
groups = info_python[2]
ascents = info_python[3]

Mountain.count_climbers(mountains, ascents, groups)

while True:

    Ui.header(main_menu)
    a = input()

    if int(a) == 1:
        while True:
            Ui.header(item1_header)
            Mountain.mountains_table(mountains)

            b = input(item1_menu)

            if int(b) == 1:
                while True:
                    Ui.header(item11_header)
                    Mountain.mountains_list(mountains)
                    Mountain.create_mountain(mountains)
                    File.write(file_path, file_name, Build.build_all(info_python))

                    c = input(item11_menu)

                    if int(c) == 1:
                        continue
                    else:
                        break
            elif int(b) == 2:
                while True:
                    Ui.header(item12_header)
                    Mountain.mountains_list(mountains)
                    Mountain.change_mountain(mountains)
                    File.write(file_path, file_name, Build.build_all(info_python))

                    c = input(item12_menu)

                    if int(c) == 1:
                        continue
                    else:
                        break
            else:
                break
    elif int(a) == 2:
        while True:
            Ui.header(item2_header)
            Climber.climbers_table(climbers)

            b = input(item2_menu)

            if int(b) == 1:
                while True:
                    Ui.header(item21_header)
                    Ascent.all_ascents_in_interval(ascents, climbers)

                    c = input(item21_menu)

                    if int(c) == 1:
                        continue
                    else:
                        break
            elif int(b) == 2:
                while True:
                    Ui.header(item22_header)
                    Climber.climbers_table(climbers)
                    Climber.climber_ascents(climbers, mountains, ascents)

                    c = input(item22_menu)
                    
                    if int(c) == 1:
                        continue
                    else:
                        break
            elif int(b) == 3:
                while True:
                    Ui.header(item23_header)
                    climber = Climber.create_climber()

                    c = input(item23_group)

                    if int(c) == 1:
                        Ui.header(item23_subheader)
                        Group.groups_table(groups)
                        Group.add_climber_to_group(climber, groups)
                    elif int(c) == 2:
                        Ui.header(item31_header)
                        group = Group.create_group()
                        Group.add_climber_to_current_group(climber, group)
                        groups.append(group)

                    climbers.append(climber)
                    File.write(file_path, file_name, Build.build_all(info_python))

                    d = input(item23_menu)

                    if int(d) == 1:
                        continue
                    else:
                        break
            else:
                break
    elif int(a) == 3:
        while True:
            Ui.header(item3_header)
            Group.groups_table(groups)

            b = input(item3_menu)

            if int(b) == 1:
                Ui.header(item31_header)
                group = Group.create_group()

                c = input(item31_menu)

                if int(c) == 1:
                    while True:
                        Ui.header(item23_subheader)
                        Climber.climbers_table(climbers)
                        climber = Climber.choose_climber(climbers)

                        if climber != None and group != None:
                            climber.group = group.name
                            group.members.append(climber)

                        File.write(file_path, file_name, Build.build_all(info_python))

                        d = input(item23_menu)

                        if int(d) == 1:
                            continue
                        else:
                            break
                elif int(c) == 2:
                    while True:
                        Ui.header(item23_subheader)
                        climber = Climber.create_climber()

                        if climber != None and group != None:
                            climber.group = group.name
                            climbers.append(climber)
                            group.members.append(climber)

                        File.write(file_path, file_name, Build.build_all(info_python))

                        d = input(item23_menu)

                        if int(d) == 1:
                            continue
                        else:
                            break
                
                if climber != None and group != None:
                    groups.append(group)
                    File.write(file_path, file_name, Build.build_all(info_python))
            elif int(b) == 2:
                Ui.header(item32_header)
                Group.groups_table(groups)
                Group.change_group(groups, climbers)
                File.write(file_path, file_name, Build.build_all(info_python))

                c = input(item32_menu)

                if int(c) == 1:
                    continue
                else:
                    break
            else:
                break
    elif int(a) == 4:
        while True:
            Ui.header(item4_header)
            Ascent.ascents_table(ascents)

            b = input(item4_menu)

            if int(b) == 1:
                while True:
                    Ui.header(item41_header)
                    Ascent.create_ascent(ascents, groups)
                    File.write(file_path, file_name, Build.build_all(info_python))

                    c = input(item41_menu)
                
                    if int(c) == 1:
                        continue
                    else:
                        break
            elif int(b) == 2:
                while True:
                    Ui.header(item42_header)
                    Ascent.ascents_table(ascents)
                    Ascent.change_ascent(groups, ascents)
                    File.write(file_path, file_name, Build.build_all(info_python))

                    c = input(item42_menu)

                    if int(c) == 1:
                        continue
                    else:
                        break
            else:
                break
    else:
        break