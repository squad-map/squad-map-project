package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class PlaceDTO(
    @SerialName("address")
    val address: String,
    @SerialName("category_id")
    val categoryId: Int,
    @SerialName("description")
    val description: String?,
    @SerialName("latitude")
    val latitude: Double,
    @SerialName("longitude")
    val longitude: Double,
    @SerialName("place_id")
    val placeId: Int,
    @SerialName("place_name")
    val placeName: String
)