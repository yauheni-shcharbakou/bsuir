import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import UserApi from '../api/user'
import { User } from '../interfaces/models'
import { roles } from '../shared/enums'
import { errorViewer } from '../shared/constants'

export default class UserClient extends BaseClient<UserApi> {
  loadAll(user: AppStore['user']) {
    this.api
      .getAll()
      .then((users) => user.setUsers(users))
      .catch((e) => console.error(e))
  }

  changeRole(currentUser: User, user: AppStore['user']) {
    if (currentUser._id) {
      this.api
        .changeRole(
          currentUser._id,
          currentUser.role === roles.admin ? roles.client : roles.admin
        )
        .then(
          (role) =>
            (user.users.filter(({ _id }) => _id === currentUser._id)[0]!.role =
              role)
        )
        .catch((e) => errorViewer(e))
    }
  }

  delete(userId: string, user: AppStore['user'], callback: () => void) {
    if (userId) {
      this.api
        .delete(userId)
        .then((id) => {
          user.deleteUser(id)
          callback()
        })
        .catch((e) => console.error(e))
    }
  }
}
