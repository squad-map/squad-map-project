package com.example.squadmap.data.repository

import com.example.squadmap.data.dto.LoginResultDTO
import com.example.squadmap.data.dto.Nickname
import com.example.squadmap.data.model.JWT
import com.example.squadmap.data.model.UserInfo

interface LoginRepository {

    suspend fun login(code: String, state: String?): LoginResultDTO

    fun saveJwt(jwtToken: JWT)

    fun setUserInfo(userInfo: UserInfo)

    fun setNickname(nickname: String)

    fun getJWT(): JWT?

    suspend fun refresh(): LoginResultDTO

    fun isLogin(): Boolean
}