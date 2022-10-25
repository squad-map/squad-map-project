package com.example.squadmap.data.dto

import kotlinx.serialization.SerialName

@kotlinx.serialization.Serializable
data class Nickname(
    @SerialName("nickname")
    val nickname: String
)
