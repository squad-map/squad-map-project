package com.example.squadmap.common

import com.example.squadmap.data.model.JWT
import com.example.squadmap.data.model.UserInfo
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AppSession @Inject constructor() {
    var jwt: JWT? = null
    var user: UserInfo? = null
}