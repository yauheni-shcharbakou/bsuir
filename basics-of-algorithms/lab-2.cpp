// Библиотеки

#include <iostream> // Библия для работы с вводом/выводом
#include <math.h> // Матан
using namespace std; // Используемое пространство имен

int main()
{
    setlocale(LC_ALL, "rus"); // Локализация
    double x, fx=0, y, z, a, c; // Переменные мои
    int v;

     // Ввод 3 переменных

    cout << "Введите a, c, z:\n" << endl; // Текст, поясняющий, что необходимо ввести
    cin >> a >> c >> z; // Считывание 3 переменных

    if (z > 1)
    {
        x = 1 / (sqrt(z - 1));
        cout << "В данном случае x = 1 / sqrt(z - 1)\n" << endl;
    }
    else
    {
        x = pow(z, 2) + 1;
        cout << "В данном случае x = z^2 + 1\n" << endl;
    }

    cout << "Выберите цифру, соответствующую значению фX:\n" << endl;
    cout << "1: 2*x\n2: x^2\n3: x/3\n" << endl;
    cin >> v;

    switch (v)
    {
    case 1:
        fx = 2 * x;
        cout << "\nВыбрано фx = 2 * x\n" << endl;
        break;
    case 2:
        fx = pow(x, 2);
        cout << "\nВыбрано фx = x^2\n" << endl;
        break;
    case 3:
        fx = x / 3;
        cout << "\nВыбрано фx = x / 3\n" << endl;
        break;
    default:
        cout << "\nВсе ясно, автор не умеет читать\n\nВыбрано фx = 0\n" << endl;
        break;
    }

    // Решение примера

    y = (a * pow(sin(pow(fx, 2) - 1), 3)) + (c * log(fabs(x))) + exp(x);

    // Вывод результата

    cout << "Y = " << y << endl;
    system("pause");
    return 0;
}