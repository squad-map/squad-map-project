package com.example.squadmap.data.repository

import com.example.squadmap.data.dto.Nickname
import com.example.squadmap.data.model.UserInfo

interface ProfileRepository {

    suspend fun update(nickname: Nickname): Nickname

    fun getUser(): UserInfo

}