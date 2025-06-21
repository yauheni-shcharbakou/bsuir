package hotel.minimal.backend.controllers

import hotel.minimal.backend.core.annotations.Controller
import hotel.minimal.backend.core.annotations.Handler
import hotel.minimal.backend.db.entities.Comment
import hotel.minimal.backend.dtos.CommentDto
import hotel.minimal.backend.dtos.DeleteDto
import hotel.minimal.backend.errors.ErrorHandler
import io.github.smiley4.ktorswaggerui.dsl.*
import io.github.smiley4.ktorswaggerui.dsl.get
import io.github.smiley4.ktorswaggerui.dsl.post
import io.github.smiley4.ktorswaggerui.dsl.put
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

@Suppress("unused")
@Controller(route = "comments")
class CommentController(application: Application) : BaseController(application) {

    @Handler
    fun getAll(route: Route) {
        route.get({ description = "get all comments" }) {
            try {
                call.respond(commentService.getAll().map { it.toDto() })
            } catch (e: Exception) {
                return@get ErrorHandler.handle(call, e)
            }
        }
    }

    @Handler
    fun getById(route: Route) {
        route.get("{id}", { description = "get comment by id" }) {
            try {
                val id: Int = call.parameters.getOrFail("id").toInt()
                call.respond(commentService.getById(id).toDto())
            } catch (e: Exception) {
                return@get ErrorHandler.handle(call, e)
            }
        }
    }

    @Handler
    fun create(route: Route) {
        route.post({ description = "create comment" }) {
            try {
                val dto: CommentDto = call.receive()

                val comment: Comment = commentService.create(
                    dto = dto,
                    newRoom = roomService.getById(dto.room)
                )

                call.respond(comment.toDto())
            } catch (e: Exception) {
                return@post ErrorHandler.handle(call, e)
            }
        }
    }

    @Handler
    fun updateById(route: Route) {
        route.put("{id}", { description = "update comment by id" }) {
            try {
                val id: Int = call.parameters.getOrFail("id").toInt()
                val dto: CommentDto = call.receive()

                val comment: Comment = commentService.change(id = id, dto = dto)

                call.respond(comment.toDto())
            } catch (e: Exception) {
                return@put ErrorHandler.handle(call, e)
            }
        }
    }

    @Handler
    fun deleteById(route: Route) {
        route.delete("{id}", { description = "delete comment by id" }) {
            try {
                val id: Int = call.parameters.getOrFail("id").toInt()
                call.respond(DeleteDto(id = commentService.delete(id)))
            } catch (e: Exception) {
                return@delete ErrorHandler.handle(call, e)
            }
        }
    }
}