package com.example.squadmap.network

import com.example.squadmap.data.dto.Nickname
import retrofit2.http.Body
import retrofit2.http.POST

interface UserApi {

    @POST("/member/update")
    suspend fun updateName(
        @Body nickname: Nickname
    ): Nickname

}