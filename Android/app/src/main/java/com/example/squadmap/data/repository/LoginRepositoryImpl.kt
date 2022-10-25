package com.example.squadmap.data.repository

import com.example.squadmap.common.AppSession
import com.example.squadmap.data.datasource.LoginDataSource
import com.example.squadmap.data.dto.LoginRequestBody
import com.example.squadmap.data.dto.LoginResultDTO
import com.example.squadmap.data.model.JWT
import com.example.squadmap.data.model.UserInfo
import javax.inject.Inject

class LoginRepositoryImpl @Inject constructor(
    private val dataSource: LoginDataSource,
    private val appSession: AppSession
) : LoginRepository {

    override suspend fun login(code: String, state: String?): LoginResultDTO {
        val body = LoginRequestBody(code, state)
        return when(state) {
            null -> dataSource.loginToGithub(body)
            else -> dataSource.loginToNaver(body)
        }
    }

    override fun saveJwt(jwtToken: JWT) {
        appSession.jwt = jwtToken
    }

    override fun setUserInfo(userInfo: UserInfo) {
        appSession.user = userInfo
    }

    override fun setNickname(nickname: String) {
        appSession.user?.let {
            val updateUserInfo = UserInfo(
                id = it.id,
                name = nickname,
                image = it.image
            )
            appSession.user = updateUserInfo
        }
    }

    override fun getJWT() = appSession.jwt

    override suspend fun refresh() = dataSource.refresh()

    override fun isLogin() = appSession.jwt != null

}