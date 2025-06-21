package app

open class Rect {
    var w = 10.0
    var h = 10.0

    constructor(w: Double, h: Double) {
        this.w = w
        this.h = h
        counter++
    }

    constructor(w: Double) {
        this.w = w
        counter++
    }

    constructor() {
        counter++
    }

    constructor(w: Int, h: Int) {
        this.w = w.toDouble()
        this.h = h.toDouble()
        counter++
    }

    constructor(w: Int) {
        this.w = w.toDouble()
        counter++
    }

    constructor(w: Float, h: Float) {
        this.w = w.toDouble()
        this.h = h.toDouble()
        counter++
    }

    constructor(w: Float) {
        this.w = w.toDouble()
        counter++
    }

    private fun per(): Double = 2 * w + 2 * h

    private fun area(): Double = w * h

    override fun toString(): String =
        "размеры: ${ this.w } х ${ this.h }, периметр: ${ this.per() }, площадь: ${ this.area() }"

    companion object {
        var counter = 0

        fun create(text: String?): Rect {
            text?.let { println(text) }

            print("Введите длину прямоугольника: ")
            val w = readLine()
            print("Введите высоту прямоугольника: ")
            val h = readLine()

            return if (w != null && h != null) Rect(w.toDouble(), h.toDouble()) else Rect()
        }

        fun contains(rect1: Rect, rect2: Rect): Boolean = rect1.w <= rect2.w && rect1.h <= rect2.h
    }
}
