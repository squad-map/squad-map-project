package com.example.squadmap.data.datasource

import com.example.squadmap.data.dto.LoginResultDTO
import com.example.squadmap.data.dto.Nickname

interface ProfileDataSource {

    suspend fun updateName(nickname: Nickname): Nickname

}