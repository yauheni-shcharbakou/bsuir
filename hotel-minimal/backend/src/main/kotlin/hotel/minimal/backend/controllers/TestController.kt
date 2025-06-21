package hotel.minimal.backend.controllers

import hotel.minimal.backend.core.annotations.Controller
import hotel.minimal.backend.core.annotations.Handler
import io.github.smiley4.ktorswaggerui.dsl.get
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

@Suppress("unused")
@Controller(route = "test")
class TestController(application: Application) : BaseController(application) {

    @Handler
    fun healthCheck(route: Route) {
        route.get({ description = "Check backend state" }) {
            call.respond(mapOf("status" to "ok"))
        }
    }
}