// Библиотеки

#include <iostream> // Библия для работы с вводом/выводом
#include <math.h> // Матан
using namespace std; // Используемое пространство имен

int main()
{
    setlocale(LC_ALL, "rus"); // Локализация
    double a, b, n, h, x, yx, sx1, sx=0, sum, fac=1; // Переменные

    // Ввод 4 переменных

    cout << "Введите a, b, h, n:\n" << endl; // Текст, поясняющий, что необходимо ввести
    cin >> a >> b >> h >> n; // Считывание 4 переменных

    for (x = a; x <= b; x += h) // Цикл для изменяющегося х
    {
        yx = ((1 - (pow(x, 2) / 2)) * cos(x)) - ((x / 2) * sin(x));
        
        for (int k = 0; k <= n; k++) // Цикл для изменяющегося к
        {
            for (int c = 1; c <= (2*k); c++) // Цикл для расчета факториала
            {
                fac *= c;
            }

            sx1 = pow(-1, k) * ((2 * pow(k, 2) + 1) / fac) * pow(x, 2 * k);
            sx += sx1;
            fac = 1; // Сброс значения факториала
        }

        sum = fabs(yx - sx);

        cout << "x = " << x << "\t yx = " << yx << "\t sx = " << sx << "\t Модуль = " << sum << endl;

        sx = 0; // Сброс значения Sx
    }

    system("pause");
    return 0;
}