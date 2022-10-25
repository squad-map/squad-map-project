package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LoginRequestBody(
    @SerialName("code")
    val code: String,
    @SerialName("state")
    val state: String?
)