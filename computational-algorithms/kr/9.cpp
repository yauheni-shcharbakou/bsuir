#include <iostream>
#include <math.h>
using namespace std;

void linearAlgorithm(int x = -32) {
  int c, y;

  c = x + 50;
  y = 2 * c - x;
  x = y / 4;
  y = c / (x + 1);

  cout << x << ' ' << y << ' ' << c << endl;
}

void branchAlgorithm(int n = 1, int m = 5) {
  int r;

  if (m > n) {
    r = m + n;
  } else {
    r = m * n;
  }

  cout << r << endl;
}

void loopAlgorithm(int s = 0, int k = 0) {
  for (int i = 1; i < 5; i++) {
    k = k + 3;
    s = s + k;
  }

  cout << k << ' ' << s << endl;
}

void baseArray(const int SIZE = 5) {
  int array[SIZE];
  int sum = 0;

  cout << "Enter " << SIZE << " numbers:" << endl;

  for (int i = 0; i < SIZE; i++) {
    cin >> array[i];

    if ((i + 1) % 2 == 1) {
      sum += array[i];
    }
  }

  cout << sum << endl;
}

void matrix(const int SIZE = 5) {
  int array[SIZE][SIZE];
  int res = 1;

  cout << "Enter matrix numbers (size: " << SIZE << "):" << endl;

  for (int i = 0; i < SIZE; i++) {
    for (int j = 0; j < SIZE; j++) {
      cout << "[" << i << ' ' << j << "]: ";
      cin >> array[i][j];

      if (((i + 1) % 2 == 1) && (j == 0)) {
        res *= array[i][j];
      }
    }
  }

  cout << res << endl;
}

int main() {
  linearAlgorithm();
  branchAlgorithm();
  loopAlgorithm();
  baseArray();
  matrix();
  return 1;
}
