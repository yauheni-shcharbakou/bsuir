; Написать программу, которая в четные биты регистра X записывает биты регистра А, 
; а в нечетные - регистра В.

    org $8000

    staa $0001  ;   сохранение в ячейку 0001 регистра А
    stab $0002  ;   сохранение в ячейку 0002 регистра B



    ldaa #0     ;   обнуление А
    ldab $0001  ;   B = ячейка 0001
    andb #1     ;   домножение на маску 00000001 (выделение младшего бита)
    stab $0004  ;   сохранение в ячейку 0004

    ldaa $0001  ;   A = яч 0001
    ldab #2     ;   B = 0000 0010
    mul         ;   A * B = D
    anda #0     ;   обнуление А
    andb #4     ;   выделение 2 бита 1 числа
    stab $0005  ;   сохранение B в ячейку 0005

    ldaa $0001  ;   А = я 0001
    ldab #4     ;   В = 0000 0100
    mul         ;   А * В = D
    anda #0     ;   обнуление А
    andb #16    ;   выделение 3 бита 1 числа
    stab $0006  ;   сохр В в яч 0006

    ldaa $0001
    ldab #8
    mul
    anda #0
    andb #64
    stab $0007  ;   4 бит 1 числа - 0007

    ldaa $0001
    ldab #16
    mul
    anda #1
    andb #0
    staa $0008  ;   5 бит 1 числа - 0008

    ldaa $0001
    ldab #32
    mul
    anda #4
    andb #0
    staa $0009  ;   6 бит 1 числа - 0009

    ldaa $0001
    ldab #64
    mul
    anda #16
    andb #0
    staa $000a  ;   7 бит 1 числа - 000a

    ldaa $0001
    ldab #128
    mul
    anda #64
    andb #0
    staa $000b  ;   8 бит 1 числа - 000b

    

    ldaa $0002
    ldab #2
    mul
    anda #0
    andb #2
    stab $000c  ;   1 бит 2 числа - 000c

    ldaa $0002
    ldab #4
    mul
    anda #0
    andb #8
    stab $000d  ;   2 бит 2 числа - 000d

    ldaa $0002
    ldab #8
    mul
    anda #0
    andb #32
    stab $000e  ;   3 бит 2 числа - 000e

    ldaa $0002
    ldab #16
    mul
    anda #0
    andb #128
    stab $000f  ;   4 бит 2 числа - 000f

    ldaa $0002
    ldab #32
    mul
    anda #2
    andb #0
    staa $0010  ;   5 бит 2 числа - 0010

    ldaa $0002
    ldab #64
    mul
    anda #8
    andb #0
    staa $0011  ;   6 бит 2 числа - 0011

    ldaa $0002
    ldab #128
    mul
    anda #32
    andb #0
    staa $0012  ;   7 бит 2 числа - 0012

    ldaa $0002
    ldab #128
    mul
    lsld
    anda #128
    andb #0
    staa $0013  ;   8 бит 2 числа - 0013



    ldab $0004  ;   сборка числа из выделенных ранее битов
    orab $0005  ;   простым AND
    orab $0006
    orab $0007

    ldaa $0008
    oraa $0009
    oraa $000e
    oraa $000b

    orab $000c
    orab $000d
    orab $000e
    orab $000f

    oraa $0010
    oraa $0011
    oraa $0012
    oraa $0013
    xgdx        ;   вывод результата в Х
hlt