package masha.bookstore.controllers

import masha.bookstore.dtos.TokenDto
import masha.bookstore.dtos.UserDto
import masha.bookstore.models.User
import masha.bookstore.shared.*
import masha.bookstore.errors.BadRequestError
import masha.bookstore.errors.ErrorMessage
import masha.bookstore.interfaces.IUserService
import masha.bookstore.shared.Role
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.USER)
@CrossOrigin(originPatterns = ["*"])
class UserController(private val userService: IUserService) {

    @GetMapping
    fun getAll(
        @RequestHeader("Authorization") authorization: String?
    ): List<UserDto> {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return userService.getAll().map { it.toDto() }
    }

    @PostMapping("auth")
    fun auth(@RequestHeader("Authorization") authorization: String?): UserDto {
        val userData: TokenDto = Auth.verify(authorization)
        return userService.getOne(userData.id).toDto()
    }

    @PostMapping("register")
    fun register(@RequestBody dto: UserDto): UserDto {
        if (dto.email.isEmpty() || dto.password.isEmpty()) {
            throw BadRequestError()
        }

        val candidate: User? = userService.getByEmail(dto.email)

        if (candidate != null) {
            throw BadRequestError(ErrorMessage.USER_ALREADY_EXISTS)
        }

        val user: User = userService.create(
            email = dto.email,
            password = dto.password,
            role = if (userService.getAmount() > 0) Role.SALESMAN else Role.ADMIN
        )

        return user.toDto()
    }

    @PostMapping("login")
    fun login(@RequestBody dto: UserDto): UserDto {
        if (dto.email.isEmpty() || dto.password.isEmpty()) {
            throw BadRequestError()
        }

        val user: User = userService.getByEmail(dto.email)
            ?: throw BadRequestError(ErrorMessage.NO_USER_WITH_THIS_EMAIL)

        if (!user.comparePasswords(dto.password)) {
            throw BadRequestError(ErrorMessage.INVALID_PASSWORD)
        }

        return user.toDto()
    }

    @PatchMapping("role")
    fun changeRole(
        @RequestBody dto: UserDto,
        @RequestHeader("Authorization") authorization: String?
    ): UserDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return userService.change(id = dto.id, role = dto.role).toDto()
    }

    @DeleteMapping
    fun delete(
        @RequestBody dto: UserDto,
        @RequestHeader("Authorization") authorization: String?
    ): Int {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return userService.delete(dto.id)
    }
}