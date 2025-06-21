#!/bin/bash

# Написать скрипт для поиска заданной пользователем строки во всех
# файлах заданного каталога и всех его подкаталогов (строка и имя каталога
# задаются пользователем в качестве первого и второго аргумента командной
# строки). На консоль выводятся полный путь и имена файлов, в содержимом
# которых присутствует заданная строка, и их размер. Если к какому либо
# каталогу нет доступа, необходимо вывести соответсвующее сообщение и
# продолжить выполнение.

recurse() {
    local items=`dir $2`

    for item in $items
        do
        local filePath="$2/$item"
        local absolutePath=`realpath $filePath`

        if [ -d $filePath ]; then
            if [ -r $filePath ]; then
                recurse $1 $filePath
                continue
            else
                echo "$filePath directory not readable"
                continue
            fi
        else
            [ -r $filePath ] && [ `grep $1 $filePath` ] && echo "$absolutePath size: `stat -c %s $filePath`"
        fi
        done
}

recurse $1 $2
