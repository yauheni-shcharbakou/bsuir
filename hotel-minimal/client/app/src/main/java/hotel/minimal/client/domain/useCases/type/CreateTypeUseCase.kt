package hotel.minimal.client.domain.useCases.type

import hotel.minimal.client.domain.interfaces.ITypeService
import hotel.minimal.client.domain.models.Type
import javax.inject.Inject

class CreateTypeUseCase @Inject constructor(private val typeService: ITypeService) {

    suspend fun createType(type: Type) {
        return typeService.create(type)
    }
}