package com.example.squadmap.data.datasource

import com.example.squadmap.data.dto.LoginRequestBody
import com.example.squadmap.network.LoginApi
import com.example.squadmap.network.RefreshApi
import javax.inject.Inject

class LoginDataSourceImpl @Inject constructor(
    private val loginApi: LoginApi,
    private val refreshApi: RefreshApi
) : LoginDataSource {

    override suspend fun loginToNaver(body: LoginRequestBody) = loginApi.loginToNaver(body)

    override suspend fun loginToGithub(body: LoginRequestBody) = loginApi.loginToGithub(body)

    override suspend fun refresh() = refreshApi.refresh()

}