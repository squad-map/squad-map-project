package com.example.squadmap.data.datasource

import com.example.squadmap.data.dto.Nickname
import com.example.squadmap.network.UserApi
import javax.inject.Inject


class ProfileDataSourceImpl @Inject constructor(
    private val api: UserApi
) : ProfileDataSource {

    override suspend fun updateName(nickname: Nickname) = api.updateName(nickname)

}