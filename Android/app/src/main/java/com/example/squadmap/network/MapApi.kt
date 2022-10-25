package com.example.squadmap.network

import com.example.squadmap.data.dto.*
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface MapApi {

    @POST("/map")
    fun createToMap(
        @Body body: MapRequestBody
    ): Int

    @POST("/map/{map_id}")
    fun updateToMap(
        @Path("map_id") id: Int,
        @Body body: MapRequestBody
    )

    @GET("/map/{map_id}")
    fun getMapDetail(
        @Path("map_id") id: Int
    ): DetailMapDTO

    @GET("/map/public")
    fun getAllPublicMap(
        @Query("page") page: Int = 0,
        @Query("size") size: Int = 0
    ): PublicMapDTO

    @GET("/map/group")
    fun getGroupMap(): GroupMapDTO

}