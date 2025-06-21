// Библиотеки

#include <iostream> // Библия для работы с вводом/выводом
#include <math.h> // Матан
#include <ctime> // Библиотека времени
using namespace std; // Используемое пространство имен

int main()
{
    setlocale(LC_ALL, "rus"); // Локализация
    int n=0, c, r, sum=0, m=0, k0=0, k1; // Переменные
    const int size = 999; // Константа, максимальный размер массива
    
    srand(time(NULL)); // Фикс одинаковых значений рандома
    int arr[size]{}; // Непосредственно массив

    cout << "Вводите размер массива (макс 999):\n" << endl;
    cin >> n;

    if (n > 0)
    {
        if (n < 1000)
        {
            cout << "Выберите необходимый метод ввода значений элементов массива:\n\n1: Самостоятельно\n2: Рандом\n" << endl;
            cin >> c;

            switch (c) // Выбор способа ввода значений
            {
            case 1:
            {
                cout << "\nВводите значения элементов массива:\n" << endl;

                for (int i = 0; i < n; i++)
                {
                    cin >> arr[i];
                }
                break;
            }
            case 2:
            {
                cout << "\nВводите диапазон для значений чисел (будет от -n/2 до n/2):\n" << endl;
                cin >> r;

                for (int i = 0; i < n; i++)
                {
                    arr[i] = rand() % r - (r / 2);
                }
                break;
            }
            default:
                cout << "\nНе понял" << endl;
                break;
            }

            cout << "МАССИВ:" << endl;

            int v = n;

            for (int k = 0; k < v; k++) // Цикл для вывода значений (элементов) массива
            {
                cout << arr[k] << "\t";

                if (m == 0)
                {
                    if (arr[k] > 0) // 2 условия, чтобы найти первое положительное
                    {
                        k0 = k + 1;
                        k1 = k0;
                        for (k0; k0 <= v; k0++) // Цикл для подсчета суммы
                        {
                            sum = sum + arr[k0];
                        }
                        m = 1;
                    }
                }
            }

            if (m == 1)
            {
                if (k1 < n)
                {
                    cout << "\nСумма = " << sum << endl;
                }
                else
                {
                    cout << "\nНет второго положительного числа" << endl;
                }
            }
            else
            {
                cout << "\nПодсчет суммы не был произведен" << endl;
            }
        }
        else 
        {
            cout << "Синий экран" << endl;
        }
    }
    else
    {
        cout << "Синий экран" << endl;
    }

    system("pause");
    return 0;
}