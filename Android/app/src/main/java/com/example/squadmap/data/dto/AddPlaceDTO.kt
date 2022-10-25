package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class AddPlaceDTO(
    @SerialName("address")
    val address: String,
    @SerialName("category_color")
    val categoryColor: String,
    @SerialName("category_id")
    val categoryId: Int,
    @SerialName("category_name")
    val categoryName: String,
    @SerialName("description")
    val description: String,
    @SerialName("map_id")
    val mapId: Int,
    @SerialName("name")
    val name: String,
    @SerialName("position")
    val position: Position
)
