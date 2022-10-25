package com.example.squadmap.network

import com.example.squadmap.data.dto.LoginResultDTO
import retrofit2.http.GET

interface RefreshApi {
    @GET("/login")
    fun refresh(): LoginResultDTO
}