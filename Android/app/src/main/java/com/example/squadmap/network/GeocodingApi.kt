package com.example.squadmap.network

import com.example.squadmap.BuildConfig
import com.example.squadmap.data.dto.GeocodingResponse
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface GeocodingApi {

    @GET("/map-geocode/v2/geocode")
    fun getCoordinate(
        @Header("X-NCP-APIGW-API-KEY-ID") id: String = BuildConfig.NAVER_MAP_ID,
        @Header("X-NCP-APIGW-API-KEY") key: String = BuildConfig.NAVER_SEARCH_KEY,
        @Query("query") query: String
    ): GeocodingResponse

}