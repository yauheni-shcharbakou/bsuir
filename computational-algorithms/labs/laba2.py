import math

def sh(n):
    return math.acosh(n)

def xp(n):
    return math.pow(n, 2)

def e(n):
    return math.pow(math.e, n)

def boolean():
    x = float(input('x = '))
    y = float(input('y = '))
    choose = input('Choose function\n1. sh(x)\n2. x^2\n3. e^x\n')

    if choose == 1:
        f = sh(x)
    elif choose == 2:
        f = xp(x)
    else:
        f = e(x)

    if x * y > 0:
        res = math.pow(f + y, 2) - math.pow(math.fabs(f), 1 / 3)
    elif x * y < 0:
        res = math.pow(f + y, 2) + math.sin(x)
    else:
        res = math.pow(f + y, 2) + math.pow(y, 3)

    print(f'res = {res}')
