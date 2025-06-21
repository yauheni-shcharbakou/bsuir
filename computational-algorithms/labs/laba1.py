import math

def linear():
    x = float(input('x = '))
    y = float(input('y = '))
    z = float(input('z = '))
    s = (2 * math.cos(x - (2 / 3))) / (0.5 + (1 - math.cos(2 * y)) / 2)
    s *= 1 + (math.pow(z, 2) / (3 - (math.pow(z, 2) / 5)))

    print(f'S = {s}')
