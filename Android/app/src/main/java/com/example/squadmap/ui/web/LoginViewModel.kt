package com.example.squadmap.ui.web

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.squadmap.common.logger
import com.example.squadmap.data.dto.LoginResultDTO
import com.example.squadmap.data.dto.toJwt
import com.example.squadmap.data.dto.toUserInfo
import com.example.squadmap.data.model.JWT
import com.example.squadmap.data.model.UserInfo
import com.example.squadmap.data.repository.LoginRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val repository: LoginRepository
) : ViewModel() {

    private lateinit var loginResult: LoginResultDTO

    private val _error = MutableSharedFlow<String>()
    val error = _error.asSharedFlow()

    private val ceh = CoroutineExceptionHandler { coroutineContext, throwable ->
        viewModelScope.launch {
            _error.emit("실패하였습니다.")
        }
    }

    fun login(code: String, state: String?) {
        viewModelScope.launch(ceh) {
            kotlin.runCatching {
                withContext(Dispatchers.IO) {
                    repository.login(code, state)
                }
            }.onSuccess {
                logger("$it")
                loginResult = it
                saveJWT(loginResult.toJwt())
                setUserInfo(loginResult.toUserInfo())
            }
        }
    }

    private fun saveJWT(jwt: JWT) {
        repository.saveJwt(jwt)
    }

    private fun setUserInfo(userInfo: UserInfo) {
        repository.setUserInfo(userInfo)
    }

    fun getJWT() = repository

}