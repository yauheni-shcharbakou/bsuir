#include <iostream>
#include <math.h>
using namespace std;

void linear(int x = 10) {
  int a, y;

  x = 10;
  a = x + 5;
  y = 2 * x + a;
  x = x + 3 * y;
  a = y - a;

  cout << "3.1:" << " a = " << a << ", x = " << x << ", y = " << y << endl;
}

void branch(int x = 5, int z = 9) {
  if (x < z) {
    z = z - x;
  } else {
    x = 3 * z;
  }

  cout << "3.2:" << " x = " << x << endl;
}

void loop(int s = 20, int k = 1, int max = 4) {
  for (int i = 1; i < max; i++) {
    k = k * 2;
    s = s - k;
  }

  cout << "3.3:" << " s = " << s << ", k = " << k << endl;
}

void oneDimensional(const int SIZE = 3) {
  int array[SIZE];
  cout << "3.4\nPut " << SIZE << " numbers:" << endl;

  for (int i = 0; i < SIZE; i++) {
    cin >> array[i];
  }

  if (array[SIZE - 1] < 0) {
    array[SIZE - 1] = abs(array[SIZE - 1]);
  } else {
    array[SIZE - 1] += array[1];
  }

  cout << "Result array:" << endl;

  for (int i = 0; i < SIZE; i++) {
    cout << array[i] << endl;
  }
}

void twoDimensional(const int M = 3) {
  int array[M][M];
  cout << "3.5\nPut " << M << "-size matrix numbers:" << endl;

  for (int i = 0; i < M; i++) {
    for (int j = 0; j < M; j++) {
      cout << "Enter [" << i << "][" << j << "] number: ";
      cin >> array[i][j];
    }
  }

  if (array[0][M - 1] < 0) {
    array[0][M - 1] = abs(array[0][M - 1]);
  } else {
    array[0][M - 1] += array[1][0];
  }

  for (int i = 0; i < M; i++) {
    for (int j = 0; j < M; j++) {
      cout << array[i][j] << ' ';
    }
    cout << endl;
  }
}

int main() {
  linear();
  branch();
  loop();
  oneDimensional();
  twoDimensional();
  return 1;
}
