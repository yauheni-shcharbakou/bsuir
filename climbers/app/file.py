import json
import os.path

class File:

    def read(file_path, file, default):
        info = None

        if os.path.isfile(file_path) == True:
            with open(file, 'r') as f:
                info = json.loads(f.read())
        else:
            info = json.loads(json.dumps(default, ensure_ascii = False))
            with open(file, 'w+') as f:
                f.write(json.dumps(default, ensure_ascii = False,  indent = 4))
        
        return info

    def write(file_path, file, info):
        if os.path.isfile(file_path) == True:
            with open(file, 'w+') as f:
                f.seek(0)
                f.close()
        
        with open(file, 'w+') as f:
            f.write(json.dumps(info, ensure_ascii = False, indent = 4))