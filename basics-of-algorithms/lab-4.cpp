#include <iostream>
#include <math.h>
using namespace std;
typedef double (*TFun)(double);

float fact(int x1) // Функция для расчета факториала
{
	float fac = 1; // Обнуление (чтобы при повторном расчете рассчитывало верно)
	for (int cf = 1; cf <= x1; cf++)
	{
		fac *= cf;
	}
	return fac;
}

double fun1(double x2) // Функция для расчета Y(x)
{
	double yx = ((1 - (pow(x2, 2) / 2)) * cos(x2)) - ((x2 / 2) * sin(x2));
	return yx;
}

double fun2(double x3) // Функция для расчета S(x)
{
	double sx = 0;

	for (int k = 0; k <= 10; k++) // Цикл для изменяющегося к
	{
		double sx0 = pow(-1, k) * (((2 * pow(k, 2)) + 1) / fact((2 * k))) * pow(x3, (2 * k));
		sx += sx0;
	}

	return sx;
}

double fun3(double x4) // Функция для расчета модуля У(x)-S(x)
{
	double rez = fabs(fun1(x4) - fun2(x4));
	return rez;
}

void Out_Rez(TFun f, double fa, double fb, double fh) // Основная функция для вывода
{
	for (double fx = fa; fx <= fb; fx += fh) // Цикл для изменяющегося х
	{
		cout << "x = " << fx << "\t\tf(x) = " << f(fx) << endl;
	}
}

int main()
{
	setlocale(LC_ALL, "rus");
	double a, b, h;
	int c;

	// Ввод 4 переменных

	cout << "Введите a, b, h:" << endl; // Текст, поясняющий, что необходимо ввести
	cin >> a >> b >> h; // Считывание 3 переменных

	if (h > 0 & b > a)
	{
		cout << "Выберите рассчитываемую функцию:\n1: Y(x)\n2: S(x)\n3: Fabs(Y(x)-S(x))" << endl;
		cin >> c;

		switch (c) // Выбор рассчитываемой функции
		{
		case 1:
		{
			Out_Rez(fun1, a, b, h);
			break;
		}
		case 2:
		{
			Out_Rez(fun2, a, b, h);
			break;
		}
		case 3:
		{
			Out_Rez(fun3, a, b, h);
			break;
		}
		default:
			cout << "\nНе понял (синий экран)" << endl;
			break;
		}
	}
	else
	{
		cout << "Введен неправильный диапазон х или же отрицательное/равное 0 значение h (синий экран)" << endl;
	}

	system("pause");
	return 0;
}