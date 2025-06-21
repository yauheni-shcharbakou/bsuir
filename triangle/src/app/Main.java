package app;

public class Main {

    public static void main(String[] args) {
        Triangle triangle1 = new Triangle();
        Triangle triangle2 = new Triangle(10, 15);
        Triangle triangle3 = new Triangle();

        triangle3.setBase(24);
        triangle3.setA(12);

        System.out.println("Параметры первого треугольника: ");
        System.out.println("Основание: " + triangle1.getBase());
        System.out.println("Длина стороны: " + triangle1.getA());
        System.out.println("Периметр: " + triangle1.getPer());
        System.out.println("Площадь: " + triangle1.getArea());

        System.out.println();

        System.out.println("Параметры второго треугольника: ");
        System.out.println("Основание: " + triangle2.getBase());
        System.out.println("Длина стороны: " + triangle2.getA());
        System.out.println("Периметр: " + triangle2.getPer());
        System.out.println("Площадь: " + triangle2.getArea());

        System.out.println();

        System.out.println("Параметры тертьего треугольника: ");
        System.out.println("Основание: " + triangle3.getBase());
        System.out.println("Длина стороны: " + triangle3.getA());
        System.out.println("Периметр: " + triangle3.getPer());
        System.out.println("Площадь: " + triangle3.getArea());

        System.out.println();

        triangle1.check();
        triangle2.check();
        triangle3.check();
    }
}
