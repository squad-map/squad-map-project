package com.example.squadmap.network

import com.example.squadmap.data.dto.LoginRequestBody
import com.example.squadmap.data.dto.LoginResultDTO
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface LoginApi {

    @POST("/login/naver")
    fun loginToNaver(
        @Body body: LoginRequestBody
    ): LoginResultDTO

    @POST("/login/github")
    fun loginToGithub(
        @Body body: LoginRequestBody
    ): LoginResultDTO

}