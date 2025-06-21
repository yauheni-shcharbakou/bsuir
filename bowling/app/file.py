# Класс для работы с файлом

import json
import os.path

class File:
    def read(path, name, default_json): # функция для чтения данных из файла
        info_json = None

        if os.path.isfile(path): # если файл существует
            with open(name, 'r') as f: # открыть
                info_json = json.loads(f.read()) # и прочитать (попутно сконвертировав в json-строку)
        else: # если нет файла
            info_json = default_json # загрузить дефолт данные
            with open(name, 'w+') as f: # создать и записать дефолтные данные в файл
                f.write(json.dumps(default_json, ensure_ascii = False, indent = 4))

        return info_json # данные в json-формате

    def write(path, name, info_json): # функция для записи данных в файл
        if os.path.isfile(path): # если файл существует
            with open(name, 'w+') as f: # открыть и очистить
                f.seek(0)
                f.close()
        
        with open(name, 'w+') as f: # снова открыть
            f.write(json.dumps(info_json, ensure_ascii = False, indent = 4)) # записать данные