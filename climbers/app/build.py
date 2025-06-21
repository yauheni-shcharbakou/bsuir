class Build:

    def build_mountains(list_python):
        list_json = []
        for mountain in list_python:
            new = dict()
            new['name'] = mountain.name
            new['height'] = mountain.height
            new['region'] = mountain.region
            new['country'] = mountain.country
            new['number_climbers'] = mountain.number_climbers
            list_json.append(new)

        return list_json

    def build_climbers(list_python):
        list_json = []
        for climber in list_python:
            new = dict()
            new['name'] = climber.name
            new['address'] = climber.address
            new['group'] = climber.group
            list_json.append(new)

        return list_json

    def build_groups(list_python):
        list_json = []
        for group in list_python:
            new = dict()
            new['name'] = group.name
            members = []

            for member in group.members:
                members.append(member.name)

            new['members'] = members
            list_json.append(new)

        return list_json

    def build_ascents(list_python):
        list_json = []
        for ascent in list_python:
            new = dict()
            new['group'] = ascent.group
            new['mountain'] = ascent.mountain
            new['date_start'] = ascent.date_start
            new['date_end'] = ascent.date_end
            list_json.append(new)

        return list_json

    def build_all(info_python):
        info_json = []
        info_json.append(Build.build_mountains(info_python[0]))
        info_json.append(Build.build_climbers(info_python[1]))
        info_json.append(Build.build_groups(info_python[2]))
        info_json.append(Build.build_ascents(info_python[3]))

        return info_json
