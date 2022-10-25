package com.example.squadmap.data.repository

import com.example.squadmap.data.datasource.ProfileDataSource
import com.example.squadmap.data.dto.Nickname
import com.example.squadmap.data.model.UserInfo
import javax.inject.Inject

class ProfileRepositoryImpl @Inject constructor(
    private val profileDataSource: ProfileDataSource,
): ProfileRepository {

    override suspend fun update(nickname: Nickname) = profileDataSource.updateName(nickname)

    override fun getUser(): UserInfo {
        TODO("Not yet implemented")
        // 추후 api에 맞게 업데이트
    }

}