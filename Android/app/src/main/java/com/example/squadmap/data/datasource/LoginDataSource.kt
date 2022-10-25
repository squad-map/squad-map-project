package com.example.squadmap.data.datasource

import com.example.squadmap.data.dto.LoginRequestBody
import com.example.squadmap.data.dto.LoginResultDTO

interface LoginDataSource {

    suspend fun loginToNaver(body: LoginRequestBody): LoginResultDTO

    suspend fun loginToGithub(body: LoginRequestBody): LoginResultDTO

    suspend fun refresh(): LoginResultDTO
}