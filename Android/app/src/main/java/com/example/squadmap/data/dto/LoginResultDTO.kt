package com.example.squadmap.data.dto


import com.example.squadmap.data.model.JWT
import com.example.squadmap.data.model.UserInfo
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LoginResultDTO(
    @SerialName("access_token")
    val accessToken: String = "",
    @SerialName("member_id")
    val memberId: Int = 0,
    @SerialName("nickname")
    val nickname: String = "",
    @SerialName("profile_image")
    val profileImage: String = "",
    @SerialName("refresh_token")
    val refreshToken: String
)

fun LoginResultDTO.toJwt(): JWT {
    return JWT(accessToken, refreshToken)
}

fun LoginResultDTO.toUserInfo(): UserInfo {
    return UserInfo(memberId, nickname, profileImage)
}