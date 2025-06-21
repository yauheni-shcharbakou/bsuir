#!/bin/bash

# Написать скрипт поиска одинаковых по их содержимому файлов в двух
# каталогов, например, Dir1 и Dir2. Пользователь задаёт имена Dir1 и Dir2 в
# качестве первого и второго аргумента командной строки. В результате работы
# программы файлы, имеющиеся в Dir1, сравниваются с файлами в Dir2 по их
# содержимому. На экран выводятся число просмотренных файлов и результаты
# сравнения.

dir1=`dir $1`
dir2=`dir $2`

counter=0

for item1 in $dir1
    do
    for item2 in $dir2
        do
        file1="$1/$item1"
        file2="$2/$item2"

        let "counter += 1"

        `cmp -s $file1 $file2` && echo "'$file1' equals '$file2'"
        done
    done

echo "$counter files from '$1' and '$2' dirs checked"
