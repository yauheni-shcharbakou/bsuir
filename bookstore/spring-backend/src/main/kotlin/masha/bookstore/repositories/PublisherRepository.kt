package masha.bookstore.repositories

import masha.bookstore.models.Publisher
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PublisherRepository : CrudRepository<Publisher, Int>