package app

class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println("Программа для работы с прямоугольниками")

            val rect1 = Rect.create("\nСоздание 1 прямоугольника\n")

            println("Параметры 1 прямоугольника: $rect1")

            val rect2 = Rect.create("\nСоздание 2 прямоугольника\n")

            println(
                if (Rect.contains(rect1, rect2)) "\n1 прямоугольник содержится во 2.\n"
                else "\n1 прямоугольник не содержится во 2.\n"
            )

            println("Параметры 2 прямоугольника: $rect2")

            val rectangles: Array<Rect> = arrayOf(
                Rect(356),
                Rect(),
                Rect(13, 63),
                Rect(13.2f, 12.4f)
            )

            rectangles[2].w = 42.0
            rectangles[2].h = 14.25

            rectangles.mapIndexed { i, r -> println("Параметры ${ i + 3 } прямоугольника: $r") }

            println("Всего создано прямоугольников: ${ Rect.counter }")
        }
    }
}
