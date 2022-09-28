package com.example.squadmap.network

import com.example.squadmap.BuildConfig
import com.example.squadmap.data.dto.StoreSearchResultDTO
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface StoreSearchApi {

//    @GET("/v1/search/local.json")
//    suspend fun getSearchResult(
//        @Header("X-Naver-Client-Id") id: String = BuildConfig.NAVER_SEARCH_ID,
//        @Header("X-Naver-Client-Secret") key: String =BuildConfig.NAVER_SEARCH_KEY ,
//        @Query("query") query: String,
//        @Query("display") display: Int,
//        @Query("start") start: Int,
//        @Query("sort") sort: String = "random"
//    ): StoreSearchResultDTO

    @GET("/v2/local/search/keyword.json")
    suspend fun getSearchResult(
        @Header("Authorization") key: String = "KakaoAK ${BuildConfig.KAKAO_REST_KEY}",
        @Query("query") query: String
    ): StoreSearchResultDTO

}