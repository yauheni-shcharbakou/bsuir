package app;

public class Triangle {
    private double base = 10;
    private double a = 24;

    public Triangle(double base, double a) {
        this.base = base;
        this.a = a;
    }

    public Triangle() {}

    public double getBase() {
        return base;
    }

    public void setBase(double base) {
        this.base = base;
    }

    public double getA() {
        return a;
    }

    public void setA(double a) {
        this.a = a;
    }

    public double getPer() {
        return this.base + (2 * this.a);
    }

    public double getArea() {
        return (this.base * Math.sqrt((this.a * this.a) - (this.base * this.base) / 4)) / 2;
    }

    private boolean isExists() {
        return this.a > this.base / 2;
    }

    public void check() {
        if (this.isExists()) {
            System.out.println("Треугольник существует.");
        } else {
            System.out.println("Треугольник не существует.");
        }
    }
}