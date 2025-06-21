from app.mountain import Mountain
from app.climber import Climber
from app.group import Group
from app.ascent import Ascent

class Load:

    def load_mountains(info_json):
        info_python = []

        for mountain in info_json:
            new = Mountain(mountain['name'], mountain['height'], mountain['region'], mountain['country'])
            info_python.append(new)

        return info_python

    def load_climbers(info_json):
        info_python = []
        
        for climber in info_json:
            new = Climber(climber['name'], climber['address'], climber['group'])
            info_python.append(new)

        return info_python

    def load_groups(info_json, climbers_list):
        info_python = []
        
        for group in info_json:
            members = []

            for member in group['members']:
                for climber in climbers_list:
                    if member == climber.name:
                        members.append(climber)

            new = Group(group['name'], members)
            info_python.append(new)

        return info_python

    def load_ascents(info_json):
        info_python = []
        
        for ascent in info_json:
            new = Ascent(ascent['group'], ascent['date_start'], ascent['date_end'], ascent['mountain'])
            info_python.append(new)

        return info_python
    
    def load_all(info_json):
        info_python = []
        info_python.append(Load.load_mountains(info_json[0]))
        climbers = Load.load_climbers(info_json[1])
        info_python.append(climbers)
        info_python.append(Load.load_groups(info_json[2], climbers))
        info_python.append(Load.load_ascents(info_json[3]))

        return info_python