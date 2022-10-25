package com.example.squadmap.network

import com.example.squadmap.data.dto.AddPlaceDTO
import com.example.squadmap.data.dto.PlaceDTO
import com.example.squadmap.data.dto.UpdatePlaceBody
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface PlaceApi {

    @POST("/places")
    fun addToPlace(
        @Body body: AddPlaceDTO
    ): Int

    @POST("/places/update")
    fun updateToPlace(
        @Body body: UpdatePlaceBody
    ): PlaceDTO

    @GET("/places/{place_id}")
    fun getDetailPlace(
        @Path("place_id") id: Int
    ): PlaceDTO

}