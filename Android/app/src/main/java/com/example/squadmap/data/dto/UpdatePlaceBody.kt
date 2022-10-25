package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class UpdatePlaceBody(
    @SerialName("category_id")
    val categoryId: Int?,
    @SerialName("description")
    val description: String?,
    @SerialName("place_id")
    val placeId: Int?
)