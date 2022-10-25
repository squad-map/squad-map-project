package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MapRequestBody(
    @SerialName("emoji")
    val emoji: String,
    @SerialName("full_disclosure")
    val fullDisclosure: Boolean,
    @SerialName("map_name")
    val mapName: String
)