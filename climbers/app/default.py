from app.mountain import Mountain
from app.ascent import Ascent
from app.climber import Climber
from app.group import Group
from app.build import Build

ivan = Climber('Иван', 'Minsk', 'g1')
semen = Climber('Семен', 'Minsk', 'g1')
oleg = Climber('Сергей', 'Minsk', 'g2')

default_python = [
    [
        Mountain('Эверест', 8800, 'Тибет', 'Китай'),
        Mountain('Эльбрус', 5500, 'Кавказ', 'Грузия')
    ],
    [
        ivan, semen, oleg
    ],
    [
        Group('g1', [ivan, semen]),
        Group('g2', [oleg])
    ],
    [
        Ascent('g1', '21.03.2014', '24.03.2014', 'Эверест'),
        Ascent('g2', '19.03.2016', '24.03.2016', 'Эльбрус')
    ]
]

default_json = Build.build_all(default_python)