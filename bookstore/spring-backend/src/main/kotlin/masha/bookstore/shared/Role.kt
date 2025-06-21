package masha.bookstore.shared

object Role {
    const val CUSTOMER = "customer"
    const val SALESMAN = "salesman"
    const val ADMIN = "admin"

    val ONLY_ADMIN: List<String> = listOf(ADMIN)
}